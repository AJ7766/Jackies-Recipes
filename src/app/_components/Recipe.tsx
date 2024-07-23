import Image from "next/image";
import carrotCake from "@/app/images/test/carrot-cake.jpg";
import meals from "@/app/images/test/meal.svg";
import profilePicture from "@/app/images/profile-picture.png";
import { useMemo } from "react";

export default function Recipe({recipe}:{recipe:string}){

    const dataValues = useMemo(() => [60, 20, 20], []); //carbs, protein, fat
    const calorieValues = useMemo(() => [240, 80, 180], []);
    const totalCalories = useMemo(() => calorieValues.reduce((acc, val) => acc + val, 0), [calorieValues]);

    return <div className="recipeContainer">
        <div className="recipeLeftSideWrapper">

        <div className="recipeUserContainer">
        <div className="recipeProfilePictureContainer">
        <div className="recipeProfilePicutre">
        <Image src={profilePicture} alt="profile-picture" />
        </div>
        </div>
        <div>
            <h2>josefinen</h2>
        </div>
        </div>

        <h1>Saftig Morotskaka</h1>
        <div className="recipeIngredientsContainer">
                <div className="recipeMacroContainer">
            <div className="nutritionContainer">
                <div className="macroContainer">
            <div className="macroInfo">
                <div className="carbsColor"></div>
                <p>Carbs: {dataValues[0]}g</p>
            </div>
            <div className="macroInfo">
                <div className="proteinColor"></div>
                <p>Protein: {dataValues[1]}g</p>
            </div>
            <div className="macroInfo">
                <div className="fatColor"></div>
                <p>Fat: {dataValues[2]}g</p>
            </div>
            <div className="macroInfo">
                <div className="caloriesColor"></div>
                <p>Calories: {totalCalories}</p>
                </div>
            </div>
            </div>
        </div>
        <div className="mealsContainer">
                <Image src={meals} alt="test"/>
                <p>4</p>
                </div>
        <table>
  <tbody>
    <tr>
      <td colSpan={2} className="recipeTitle">Kaka</td>
    </tr>
    <tr>
      <td className="amount">300 g</td>
      <td>morötter (4-5 medelstora morötter)</td>
    </tr>
    <tr>
      <td className="amount">1 dl</td>
      <td>farinsocker</td>
    </tr>
    <tr>
      <td className="amount">2 msk</td>
      <td>malen kanel</td>
    </tr>
    <tr>
      <td className="amount">1 msk</td>
      <td>malen kardemumma</td>
    </tr>
    <tr>
      <td className="amount">2 msk</td>
      <td>malen ingefära</td>
    </tr>
    <tr>
      <td className="amount">6 st</td>
      <td>ägg</td>
    </tr>
    <tr>
      <td className="amount">5 dl</td>
      <td>strösocker</td>
    </tr>
    <tr>
      <td className="amount">2,5 dl</td>
      <td>neutral olja (raps-, mat- eller solrosolja)</td>
    </tr>
    <tr>
      <td className="amount">1 dl</td>
      <td>vaniljsocker</td>
    </tr>
    <tr>
      <td className="amount">1 msk</td>
      <td>bakpulver</td>
    </tr>
    <tr>
      <td className="amount">6 dl</td>
      <td>vetemjöl</td>
    </tr>
  </tbody>
</table>

<table>
  <tbody>
    <tr>
      <td colSpan={2} className="recipeTitle">Frostning</td>
    </tr>
    <tr>
      <td className="amount">600 g</td>
      <td>färskost</td>
    </tr>
    <tr>
      <td className="amount">300 g</td>
      <td>rumstempererat smör</td>
    </tr>
    <tr>
      <td className="amount">2 tsk</td>
      <td>vaniljsocker</td>
    </tr>
    <tr>
      <td className="amount">4 dl</td>
      <td>florsocker</td>
    </tr>
    <tr>
      <td className="amount">2 st</td>
      <td>rivna skal från 2 lime</td>
    </tr>
  </tbody>
</table>
        </div>
        </div>
        <div className="recipeRightSideWrapper">
        <div className="recipeImageContainer">
        <Image src={carrotCake} alt="test"/>
        </div>
        <div className="recipeInstructionsContainer">
        <table>
    <tbody>
      <tr>
        <td>1.</td>
        <td>Sätt ugnen på 175 grader (över- och undervärme) och täck din långpanna med bakplåtspapper.</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>Skala morötterna och riv dem fint på ett rivjärn. I en bunke blandar du ihop rivna morötter, farinsocker, kanel, kardemumma och ingefära. Ställ åt sidan för att dra medan du gör resten av smeten. Detta kommer att göra så att smakerna av kryddorna kommer fram extra mycket med hjälp av vätskan från morötterna.</td>
      </tr>
      <tr>
        <td>3.</td>
        <td>Ta fram en ny bunke som du vispar ägg och strösocker i, vitt och pösigt med elvisp. Ha sedan ner blandningen med rivna morötter och neutral olja. Blanda försiktigt ihop till en jämn smet.</td>
      </tr>
      <tr>
        <td>4.</td>
        <td>Sikta ner vaniljsocker, bakpulver och vetemjöl. Vänd försiktigt ihop till en jämn smet med slickepott.</td>
      </tr>
      <tr>
        <td>5.</td>
        <td>Häll upp smeten i långpannan och grädda kakan i nedre delen av ugnen i 40-45 minuter eller tills kakan är helt genomgräddad. Låt kakan svalna helt och hållet i rumstemperatur innan du brer på frosting.</td>
      </tr>
      <tr>
        <td>6.</td>
        <td>Frostingen gör du genom att vispa ihop färskost och smör riktigt krämigt med elvisp i en bunke.</td>
      </tr>
      <tr>
        <td>7.</td>
        <td>Sikta ner florsockret och vaniljsocker. Vänd försiktigt ihop till en jämn och krämig frosting med slickepott. Det är viktigt att du verkligen försiktigt vänder ner florsockret och inte blandar för hårt för då kommer frostingen att bli lös. Om du upplever att din frosting ändå blir lös kan du ställa in den i kylskåpet en stund för att tjockna.</td>
      </tr>
      <tr>
        <td>8.</td>
        <td>Bre ut frostingen på kakan när den svalnat och toppa med det yttersta skalet från 2 limefrukter.</td>
      </tr>
    </tbody>
  </table>
        </div>
        </div>
        </div>
}