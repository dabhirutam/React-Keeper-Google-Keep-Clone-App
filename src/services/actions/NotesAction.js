import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../FierbaseConfig";

export const ViewNotesSuc = (notes) => {
    return {
        type: "VIEW_NOTES_SUC",
        payload: notes
    }
}

export const AddNotesSuc = () => {
    return {
        type: "ADD_NOTES_SUC"
    }
}

export const SingleNotesSuc = (data) => {
    return {
        type: "SINGLE_NOTES_SUC",
        payload: data
    }
}   

export const UpdateNotesSuc = () => {
    return {
        type: "UPDATE_NOTES_SUC",
    }
}   

export const Loading = () => {
    return {
        type: "LOADING"
    }
}


export const ViewNotesAsync = (tag) => async dispatch => {
    try {
        const res = await getDocs(collection(db, "notes"));
        const notes = [];

        res.forEach(doc => {
            const newRec = doc.data();
            newRec.id = doc.id;

            if (tag === newRec.tags) notes.push(newRec);
        })
        dispatch(ViewNotesSuc(notes));
    } catch (err) {
        console.log(err);
    }
}

export const AddNotesAsync = (data) => async dispatch => {
    try {
        dispatch(Loading);
        await addDoc(collection(db, "notes"), data);
        dispatch(AddNotesSuc());
    } catch (err) {
        console.log(err);
    }
}

export const SingleNotesAsync = (id) => {
    return async disptch => {

        const res = await getDoc(doc(db, "notes", `${id}`));

        if (res.exists()) {
            let newRec = res.data();
            newRec.id = res.id;

            disptch(SingleNotesSuc(newRec));
        } else {
            console.log("No such document!");
        }
    }
};

export const UpdateNotesAsync = (data) => {

    return async disptch => {
        try {
            await setDoc(doc(db, "notes", `${data.id}`), data);
            disptch(UpdateNotesSuc());
        } catch (err) {
            console.log(err);
        }
    }
};

export const DeleteNotesAsync = (id, tag) => {

    return async disptch => {
        try {
            await deleteDoc(doc(db, "notes", `${id}`));
            disptch(ViewNotesAsync(tag));
        } catch (err) {
            console.log(err);
        }
    }
};