import { z } from "zod";
import password from "../common/validation/password";


const SignInFormSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password,
});

export default SignInFormSchema;
