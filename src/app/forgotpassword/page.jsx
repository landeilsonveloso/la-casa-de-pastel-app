"use client"

import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Logo from "src/components/Logo"
import Main from "src/containers/Main"
import { MdEmail } from "react-icons/md"
import Navigation from "src/components/Navigation"
import Spinner from "src/components/Spinner"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"

export default function ForgotPasswordPage() {
    const {
        setEmail,
        disabledUserButton,
        forgotPassword
    } = useUser()

    return (
        <Main>
            <Form className="flex flex-col" onSubimit={forgotPassword}>
                <Logo/>

                <Title>Recuperar Senha</Title>

                <Div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <MdEmail size={24}/>

                    <Input
                        className="w-full px-2 text-white outline-none"
                        id="email"
                        name="email"
                        type="email"
                        maxLength={60}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </Div>

                <Button className={`flex justify-center w-full py-2 rounded-lg bg-blue-600 text-white font-bold transition ${disabledUserButton ? "cursor-default opacity-70" : "hover:bg-blue-800 cursor-pointer"}`} disabled={disabledUserButton}>
                    {disabledUserButton ? <Spinner/> : <>Enviar</>}
                </Button>
                    
                <Navigation className="text-center my-2" href="/">
                    Voltar
                </Navigation>
            </Form>
        </Main>
    )
}
