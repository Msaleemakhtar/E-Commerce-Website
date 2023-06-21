import SignUpForm from "@/components/views/signUpForm";
import ContextWrapper from "@/global/context";


const SignUpAuth = () => {
    return (
        <ContextWrapper>
          <SignUpForm/>
        </ContextWrapper>
    );
};

export default SignUpAuth;