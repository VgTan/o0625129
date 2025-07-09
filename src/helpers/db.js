import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export const handleRegister = async (e, data) => {
  e.preventDefault();
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(userCred.user, {
      displayName: data.nickname,
    });

    const userRef = doc(db, "users", userCred.user.uid);
    await setDoc(userRef, {
      email: data.email,
      displayName: data.nickname,
      role: "user",
    });

    alert("Registrasi berhasil!");
    return userCred;
  } catch (error) {
    alert("Registrasi gagal: " + error.message);
    throw error;
  }
};

export const handleGoogleSignup = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCred = await signInWithPopup(auth, provider);

    const user = userCred.user;
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      try {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || "",
          role: "user",
        });
        console.log("User saved to Firestore");
      } catch (err) {
        console.error("❌ Gagal menyimpan user Google:", err.message);
      }
    }

    alert("Registrasi Google berhasil!");
    return userCred;
  } catch (error) {
    alert("Registrasi Google gagal: " + error.message);
    throw error;
  }
};

export const handleLogin = async (e, data) => {
  e.preventDefault();
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    alert("Login berhasil!");
    return userCred;
  } catch (error) {
    alert("Login gagal: " + error.message);
    throw error;
  }
};

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCred = await signInWithPopup(auth, provider);
    const user = userCred.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // Kalau belum ada, simpan ke Firestore
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "",
        role: "user", // atau role default lain
      });
      console.log("✅ User Google baru disimpan ke Firestore");
    }

    alert("Login Google berhasil!");
    return userCred;
  } catch (error) {
    alert("Login Google gagal: " + error.message);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    alert("Logout berhasil!");
  } catch (error) {
    console.error("Logout gagal:", error);
    alert("Logout gagal: " + error.message);
  }
};

export const getUser = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getProduct = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getSetting = async () => {
  const querySnapshot = await getDocs(collection(db, "settings"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const uploadToCloudinary = async (file) => {
  const cloudName = "dxnxicfup";
  const uploadPreset = "SHOPSMART";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary error:", data);
    throw new Error(data?.error?.message || "Upload gagal");
  }

  return data.secure_url;
};

export const simpanProdukKeFirestore = async (data) => {
  const { harga, reward, poin, imageUrl, ...rest } = data;

  if (!imageUrl) {
    throw new Error("Gambar belum berhasil diupload");
  }

  const docRef = await addDoc(collection(db, "products"), {
    ...rest,
    imageUrl,
    harga: Number(harga),
    reward: Number(reward),
    poin: Number(poin),
    createdAt: new Date(),
  });

  return {
    ...rest,
    imageUrl,
    harga: Number(harga),
    reward: Number(reward),
    poin: Number(poin),
    id: docRef.id,
  };
};
export const editProductById = async (id, newData) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, newData);
};

export const deleteProductById = async (id, newData) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef, newData);
};

export const simpanSettingKeFirestore = async (data) => {
  const { waktu, round, ...rest } = data;

  const docRef = await addDoc(collection(db, "settings"), {
    ...rest,
    waktu: Number(waktu),
    round: Number(round),
    createdAt: new Date(),
  });

  return { ...data, waktu: Number(waktu), round: Number(round), id: docRef.id };
};

export const editSettingById = async (id, newData) => {
  const productRef = doc(db, "settings", id);
  await updateDoc(productRef, newData);
};

export const deleteSettingById = async (id, newData) => {
  const productRef = doc(db, "settings", id);
  await deleteDoc(productRef, newData);
};
