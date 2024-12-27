import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../../FierbaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";


export const SignUpSuc = () => {
    return {
        type: "SIGNUP_SUC",
    }
}

export const CloaseSignUp = () => {
    return {
        type: "CLOASE_SIGNUP"
    }
}

export const SignInSuc = (data) => {
    return {
        type: "SIGNIN_SUC",
        payload: data
    }
}

export const LogOutSuc = () => {
    return {
        type: "LOGOUT_SUC",
    }
}

export const Loading = () => {
    return {
        type: "LOADING"
    }
}


export const SignUpAsync = (data) => {
    return dispatch => {
        dispatch(Loading());
        createUserWithEmailAndPassword(auth, data.email, data.password).then(() => {
            dispatch(SignUpSuc());
        }).catch(err => {
            console.log("Error code", err.code);
            console.log("Error message", err.message);
        })
    }
}

export const SignInAsync = (data) => async dispatch => {

    try {
        dispatch(Loading());
        const res = await signInWithEmailAndPassword(auth, data.email, data.password);

        const userData = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            email: res.user.email
        }

        await addDoc(collection(db, "users"), userData);
        localStorage.setItem('clone_user_id', JSON.stringify(userData.uid));
        dispatch(SignInSuc(userData));
    } catch (err) {
        console.log("Error code", err.code);
        console.log("Error message", err.message);
    }
}

export const SignInGoogleAsync = () => async dispatch => {
    try {
        dispatch(Loading());
        const res = await signInWithPopup(auth, provider)

        const userData = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }

        await addDoc(collection(db, "users"), userData);
        localStorage.setItem('clone_user_id', JSON.stringify(userData.uid));
        dispatch(SignInSuc(userData));
    } catch (err) {
        console.log("Error code", err.code);
        console.log("Error message", err.message);
    }
}


export const LogOutAsync = () => {
    return dispatch => {
        signOut(auth).then(() => {
            localStorage.removeItem("clone_user_id");
            dispatch(LogOutSuc());
        }).catch(err => {
            console.log("Error code", err.code);
            console.log("Error message", err.message);
        })
    }
}

export const FindUserAsync = () => async dispatch => {
    const user_id = JSON.parse(localStorage.getItem("clone_user_id"));
    const res = await getDocs(collection(db, "users"));

    res.forEach((doc) => {
        if (doc.data().uid == user_id) dispatch(SignInSuc(doc.data()));
    });
}