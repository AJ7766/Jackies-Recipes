    "use client"

    import NavBar from "../_components/NavBar";
    import { useAuth } from "../context/AuthContext";
    import AddRecipeForm from "./_components/AddRecipeForm";

    export default function AddRecipe(){
        const {user} = useAuth();
        return(<>
        <NavBar />
        <AddRecipeForm />
        </>
        )
    }