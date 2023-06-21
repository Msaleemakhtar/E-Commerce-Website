import SignInForm from "@/components/views/SignInForm";
import ContextWrapper from "@/global/context";


const SignInAuth= () => {
    return (
        <ContextWrapper>
         <SignInForm/>
        </ContextWrapper>
    );
};

export default SignInAuth;