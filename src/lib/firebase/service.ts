import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from './init';
import bcyrpt from 'bcrypt';

const firestore = getFirestore(app)

export async function retriveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore,collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data()
    }));

    return data;
}

export async function retriveDataById(collectionName: string, id: string) {
    const snapshot = await getDocs(doc)(firestore, collectionName, id);
    const data = snapshot.data();
    return data;
}

export async function signUp(userData: {
    email: string;
    fullname: string;
    password: string;
    phone: string;
    role?: string
}, callback: Function) {
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', userData.email),        
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    if(data.length > 0) {
        callback(false);
    } else {
        if (!userData.role) {
            userData.role = 'member';
        }
        userData.password = await bcyrpt.hash(userData.password, 10);
        await addDoc(collection(firestore, 'users'), userData)
        .then(() => {
            callback(true);
        })
        .catch((error) => {
            callback(false);
            console.log(error);
        });
    }
}