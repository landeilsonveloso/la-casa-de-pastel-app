"use client"

import Button from "../components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "../components/Input"
import Logo from "../components/Logo"
import Main from "src/containers/Main"
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md"
import Navigation from "src/components/Navigation"
import Spinner from "src/components/Spinner"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"
import useUtilities from "src/hooks/useUtilities"

export default function SignInPage() {
    const {
        setEmail,
        setPassword,
        disabledUserButton,
        signIn
    } = useUser()

    const {
        passwordVisibility,
        setPasswordVisibility
    } = useUtilities()

    return (
        <Main>
            <Form className="flex flex-col gap-4" onSubmit={signIn}>
                <Logo/>

                <Title className="text-lg sm:text-xl lg:text-2xl text-center">Entrar</Title>
                
                <Div className="flex items-center w-full p-2 sm:p-3 bg-black/30 text-white border border-white/20 rounded-lg focus-within:ring-1 focus-within:ring-blue-600">
                    <MdEmail size={24}/>

                    <Input
                        className="w-full px-2 text-white outline-none text-sm sm:text-base"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Div>

                <Div className="flex items-center w-full p-2 sm:p-3 bg-black/30 text-white border border-white/20 rounded-lg focus-within:ring-1 focus-within:ring-blue-600">
                    <MdLock size={24}/>

                    <Input
                        className="w-full px-2 text-white outline-none text-sm sm:text-base"
                        id="password"
                        name="password"
                        type={passwordVisibility ? "text" : "password"}
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {passwordVisibility ? 
                        <MdVisibility className="cursor-pointer" size={24} onClick={() => setPasswordVisibility(false)}/>
                    :
                        <MdVisibilityOff className="cursor-pointer" size={24} onClick={() => setPasswordVisibility(true)}/>
                    }
                </Div>

                <Navigation className="flex justify-end text-xs sm:text-sm" href="/forgotpassword">
                    Esqueceu a senha?
                </Navigation>

                <Button className={`flex justify-center w-full py-2 sm:py-3 rounded-lg bg-blue-600 text-white font-bold transition ${disabledUserButton ? "cursor-default opacity-70" : "hover:bg-blue-800 cursor-pointer"}`} disabled={disabledUserButton}>
                    {disabledUserButton ? <Spinner/> : <>Entrar</>}
                </Button>
            </Form>
        </Main>
    )
}
