document.addEventListener('DOMContentLoaded', () => {
    let genderSpot = document.getElementById('gender');
    let ageSpot = document.getElementById('age');
    let nationalitySpot = document.getElementById('nationality');

    document.getElementById('predictBtn').addEventListener('click', () => {
        //clear the results
        genderSpot.innerHTML = '--';
        ageSpot.innerHtml = '--';
        nationalitySpot.innerHTML = '--';

        //get new results
        let name = document.getElementById('nameInput').value
        fetch(`https://api.genderize.io?name=${name.toLowerCase()}`)
            .then((response) => {return response.json();})
            .then( (data) => {
                genderSpot.innerHTML = data.gender;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('gender').innerHTML = "We can't get this for you now."
            });
        fetch(`https://api.agify.io?name=${name.toLowerCase()}`)
            .then((response) => {return response.json();})
            .then( (data) => {
                ageSpot.innerHTML = data.age;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('age').innerHTML = "We can't get this for you now."
            });
        fetch(`https://api.nationalize.io?name=${name.toLowerCase()}`)
            .then((response) => {return response.json();})
            .then( (data) => {
                let country = data.country[0].country_id
                nationalitySpot.innerHTML = processCountryCode(country);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                nationalitySpot.innerHTML = "We can't get this for you now."
            });
    })
})

//convert country code to country name
function processCountryCode(country) {
    const regionNames = new Intl.DisplayNames(['en'], {type:'region'});
    return regionNames.of(country);
}