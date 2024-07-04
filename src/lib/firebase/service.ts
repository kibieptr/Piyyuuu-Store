import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string): Promise<any[]> {
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function retrieveDataById(
  collectionName: string,
  id: string
): Promise<any | null> {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function userExists(email: string): Promise<boolean> {
  const q = query(collection(firestore, "users"), where("email", "==", email));
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
  created_at?: Date;
  updated_at?: Date;
}): Promise<void> {
  if (!userData.role) {
    userData.role = "member";
  }
  const data = await retrieveDataByField("users", "email", userData.email);
  userData.password = await hashPassword(userData.password);
  userData.created_at = new Date();
  userData.updated_at = new Date();
  await addDoc(collection(firestore, "users"), userData);
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    phone: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: (success: boolean) => void
): Promise<void> {
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
  const data = await retrieveDataByField("users", "email", userData.email);
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    email: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    password?: string;
  },
  callback: Function
) {
  const user = await retrieveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback(data);
    });
  }
}
