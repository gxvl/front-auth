import { z } from "zod";
import password from "../common/validation/password";


const SignUpFormSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(50, "O nome deve ter no máximo 50 caracteres"),
  password,
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não coincidem.",
  path: ["passwordConfirmation"], 
});

export default SignUpFormSchema;
