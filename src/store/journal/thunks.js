
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from '../../helper/fileUpload';
import { loadNotes } from '../../helper/loadNotes';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteById} from './journalSlice';


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notas` ) );

        const setDocResp = await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe.')

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    
    }
}

export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;


        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true } )

        dispatch( noteUpdated( note ) ) ;

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );

        // await fileUpload ( files[0] );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photoUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photoUrls ) );

    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
       
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }` );
        const resp = await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );

    }
}