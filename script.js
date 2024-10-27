const nameInput = document.getElementById("groomName");
const startingBid = document.getElementById("startbid");
const education = document.getElementById("education");
const familyWorth = document.getElementById("familyWorth");
const caste = document.getElementById("caste");
const ageRadios = document.getElementsByName("age");
const skills = document.getElementsByClassName("skills");
const reputation = document.getElementsByClassName("reputation");
const loveLetter = document.getElementById("loveLetter");
const result = document.getElementById("result");

const calculate = () => {
    try {
        let name = nameInput.value;
        let price = parseFloat(startingBid.value);
        if (!name || isNaN(price) || price <= 0) {
            alert("check plz both a valid name and starting bid");
            return;
        }
        console.log("starting bid:", price);

        const educationMult = parseFloat(education.value);
        price *= educationMult;
        console.log("after education multiplier:", price);
        const familyWorthMult = parseFloat(familyWorth.value);
        price *= familyWorthMult;
        console.log("after family worth multiplier:", price);

        let ageMult = 1;
        for (let age of ageRadios) {
            if (age.checked) {
                ageMult = parseFloat(age.value);
                break;
            }
        }
        price *= ageMult;
        console.log("after age mult:", price);
        
        let reputationDeduction = 0;
        for (let rep of reputation) {
            if (rep.checked) {
                const value = parseFloat(rep.value);
                if (value < 1 && value > 0) {
                    price *= value; 
                    console.log(`after reputation multiplier (${value}):`, price);
                } else if (value >= 1) {
                    reputationDeduction += value;
                    console.log(`adding reputation deduction (${value}):`, reputationDeduction);
                } else {
                    price += value;
                    console.log(`negative reputation deduction (${value}):`, price);
                }
            }
        }
        const casteValue = parseFloat(caste.value);
        price += casteValue;
        console.log("after caste:", price);
        for (let skill of skills) {
            if (skill.checked) {
                price += parseFloat(skill.value);
            }
        }
        console.log("after skills:", price);
        price -= reputationDeduction;
        console.log("after reputation deduction:", price);

        const person = {
            groom_name: name,
            groom_price: price,
            letter_to_bride: loveLetter.value
        };

        result.innerHTML = `The dowry price for ${person.groom_name} is $${person.groom_price.toFixed(2)}.<br>love letter: "${person.letter_to_bride}"`;
    } catch (error) {
        console.error("An error occurred during calculation:", error);
    }
};
document.getElementById("calcButton").addEventListener("click", calculate);
