import { doc, getFirestore, setDoc } from "firebase/firestore"
import app from "../firebase"
import { auth } from "./auth"

export const db = getFirestore(app)

export const addToUniteDB = (id, role) => {
  setDoc(doc(db, "Unite", id), {
    role: role,
  })
}
export const addBusToDatabase = (data) => {
  console.log(data.uid)
  setDoc(doc(db, "Buses", data.uid), { ...data })
  addToUniteDB(data.uid, "bus")
}
export const addTrainToDatabase = (data) => {
  setDoc(doc(db, "Trains", data.uid), { ...data })
  addToUniteDB(data.uid, "train")
}
export const addCommuterToDatabase = () => {
  const user = auth.currentUser
  setDoc(doc(db, "Commuters", user.uid), {
    uid: user.uid,
    role: "commuter",
    name: user.displayName,
    email: user.email,
  })
  addToUniteDB(user.uid, "user")
}