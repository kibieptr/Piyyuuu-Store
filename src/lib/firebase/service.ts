import { addDoc, collection, doc, getDocs, getFirestore, query, where, getDoc } from 'firebase/firestore';
import app from './init';
import bcrypt from 'bcrypt';

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string): Promise<any[]> {
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id,...doc.data() }));
}

export async function retrieveDataById(collectionName: string, id: string): Promise<any | null> {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists()? { id: docSnap.id,...docSnap.data() } : null;
}

export async function userExists(email: string): Promise<boolean> {
  const q = query(collection(firestore, 'users'), where('email', '==', email));
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function createUser(userData: {
  email: string;
  fullname: string;
  password: string;
  phone: string;
  role?: string;
}): Promise<void> {
  if (!userData.role) {
    userData.role = 'member';
  }
  userData.password = await hashPassword(userData.password);
  await addDoc(collection(firestore, 'users'), userData);
}

export async function signUp(userData: {
  email: string;
  fullname: string;
  password: string;
  phone: string;
  role?: string;
}, callback: (success: boolean) => void): Promise<void> {
  try {
    if (await userExists(userData.email)) {
      callback(false);
    } else {
      await createUser(userData);
      callback(true);
    }
  } catch (error) {
    callback(false);
    console.error(error);
  }
}

export async function signIn(email: string) {
  const q = query(
    collection(firestore, 'users'), 
    where('email', '==', email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ 
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
}