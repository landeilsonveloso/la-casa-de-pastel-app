"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Logo from "src/components/Logo"
import Main from "src/containers/Main"
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md"
import Spinner from "src/components/Spinner"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"
import useUtilities from "src/hooks/useUtilities"


export default function RedefinePasswordPage() {
    const {
        setPassword,
        setConfirmPassword,
        disabledUserButton,
        redefinePassword
    } = useUser()

    const {
        passwordVisibility,
        setPasswordVisibility,
        passwordConfirmVisibility,
        setConfirmPasswordVisibility
    } = useUtilities()

    return (
        <AuthProvider>
            <Main>
                <Form className="flex flex-col" onSubimit={redefinePassword}>
                    <Logo/>

                    <Title>Redefinir Senha</Title>

                    <Div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                        <MdLock size={24}/>

                        <Input
                            className="w-full px-2 text-white outline-none"
                            id="password"
                            name="password"
                            type={passwordVisibility ? "text" : "password"}
                            maxLength={18}
                            placeholder="Nova senha"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {passwordVisibility ? 
                            <MdVisibility className="cursor-pointer" size={24} onClick={() => setPasswordVisibility(false)}/>
                        :
                            <MdVisibilityOff className="cursor-pointer" size={24} onClick={() => setPasswordVisibility(true)}/>
                        }
                    </Div>

                    <Div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                        <MdLock size={24}/>

                        <Input
                            className="w-full px-2 text-white outline-none"
                            id="password"
                            name="password"
                            type={passwordConfirmVisibility ? "text" : "password"}
                            maxLength={18}
                            placeholder="Confirmar nova senha"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {passwordConfirmVisibility ? 
                            <MdVisibility className="cursor-pointer" size={24} onClick={() => setConfirmPasswordVisibility(false)}/>
                        :
                            <MdVisibilityOff className="cursor-pointer" size={24} onClick={() => setConfirmPasswordVisibility(true)}/>
                        }
                    </Div>

                    <Button className={`flex justify-center w-full py-2 rounded-lg bg-blue-600 text-white font-bold transition ${disabledUserButton ? "cursor-default opacity-70" : "hover:bg-blue-800 cursor-pointer"}`} disabled={disabledUserButton}>
                        {disabledUserButton ? <Spinner/> : <>Redefinir</>}
                    </Button>
                </Form>
            </Main>
        </AuthProvider>
    )
}
