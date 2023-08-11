import { useState, useRef, useEffect, useContext } from "react"
import { Bus } from "../Data/Bus"
import { useNavigate } from "react-router-dom"
import { addBusToDatabase } from "../Utils/database"
import { auth } from "../Utils/auth"
import { setAuthContext, updateCurrentUserState } from "./User"

export const BusForm = () => {
  const setUser = useContext(setAuthContext)
  const navigate = useNavigate()
  const [validity, setValidity] = useState({
    routenoV: true,
    numberplateV: true,
    organisationV: true,
  })
  const [government, setGovernment] = useState(true)
  const form = useRef(null)
  const organisationName = useRef("ctb")
  const numberplate = useRef("")
  const routeNo = useRef("")
  const desA = useRef("")
  const desB = useRef("")

  const checkInput = () => {
    event.preventDefault()

    setValidity({
      routenoV: !(routeNo.current.value === ""),
      numberplateV: numberplate.current.value.length > 5,
      organisationV: !(!government && organisationName.current.value === ""),
    })
    if (
      !(routeNo.current.value === "") &&
      numberplate.current.value.length > 5 &&
      !(!government && organisationName.current.value === "")
    ) {
      navigate("/busmap")

      let data = new Bus(
        auth.currentUser.uid,
        routeNo.current.value,
        numberplate.current.value,
        true,
        organisationName.current.value,
        desA.current.value,
        desB.current.value
      )

      data.getLocationInformation()
      console.log(data)
      addBusToDatabase(data)
      updateCurrentUserState(auth.currentUser, setUser)
    }
  }

  useEffect(() => {
    organisationName.current.value = government ? "ctb" : ""
    organisationName.current.hidden = government
  }, [government])

  return (
    <form
      ref={form}
      onSubmit={checkInput}
      method="get"
      className="relative flex h-[85%] w-full flex-col items-start rounded-b-xl rounded-r-xl bg-white p-5 shadow-upwardsXL"
    >
      <label className="mb-2" htmlFor="busrouteno">
        Route No<span className="font-bold text-red-400">*</span>
      </label>
      <input
        ref={routeNo}
        id="busrouteno"
        name="busrouteno"
        type="text"
        placeholder="e.g. 101"
        className={`${!validity.routenoV && "border-red-500"} 
        mb-4 rounded-md border border-black px-2 leading-loose`}
      />

      <label className="mb-2" htmlFor="numberplate">
        Number Plate<span className="font-bold text-red-400">*</span>
      </label>
      <input
        ref={numberplate}
        id="numberplate"
        name="numberplate"
        type="text"
        placeholder="e.g. ND-1986"
        className={`${
          !validity.numberplateV && "border-red-500"
        } mb-4 rounded-md border border-black px-2 leading-loose`}
      />

      <div className="mb-2 flex">
        <button
          type="button"
          onClick={() => {
            setGovernment(true)
          }}
          className={`mr-3 rounded px-2 py-1 ${
            government ? "bg-accent text-white" : "bg-white text-black"
          }  border border-black`}
        >
          Ceylon Transport Board (CTB)
        </button>
        <button
          type="button"
          className={`rounded px-2 py-1 ${
            !government ? "bg-accent text-white" : "bg-white text-black"
          }  border border-black`}
          onClick={() => {
            setGovernment(false)
          }}
        >
          Other
        </button>
      </div>

      <input
        id="organisation"
        name="organisation"
        type="text"
        placeholder="Organisation Name"
        ref={organisationName}
        className={`${!validity.organisationV && "border-red-500"} 
        mb-3 mt-1 border-b-2 border-black px-2 outline-0`}
      />
      <label className="mb-2" htmlFor="desA">
        Destination A<span className="font-bold text-red-400">*</span>
      </label>
      <input
        ref={desA}
        id="desA"
        name="desA"
        type="text"
        placeholder="e.g. Moratuwa"
        className={`
        mb-4 rounded-md border border-black px-2 leading-loose`}
      />

      <label className="mb-2" htmlFor="desB">
        Destination B<span className="font-bold text-red-400">*</span>
      </label>
      <input
        ref={desB}
        id="desB"
        name="desB"
        type="text"
        placeholder="e.g. Pettah"
        className={`
        mb-4 rounded-md border border-black px-2 leading-loose`}
      />

      <button
        type="submit"
        className={
          "btn btn-secondary mt-2 h-auto w-auto bg-green-600 md:absolute md:bottom-5"
        }
      >
        Update Profile
      </button>
    </form>
  )
}
