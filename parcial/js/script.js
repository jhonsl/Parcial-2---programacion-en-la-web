let page = 1;
let date = '2015-07-2';
let image = document.getElementById('photo');
let tableBody = document.getElementById('table-body');
let idP = document.getElementById('id');
let martianP = document.getElementById('martian');
let earthP = document.getElementById('earth');

function loadData() {
	fetch(
		`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=yPGC078gVH2hGjSYSTuKaSdHZaa4gBMm2doFQrNm&page=${page}#`
	)
		.then((response) => response.json())
		.then(setTableData);
}

function setTableData(data) {
	for (const photo of data.photos) {
		const row = document.createElement('tr');
		const tdId = document.createElement('td');
		const tdRoverName = document.createElement('td');
		const tdCamera = document.createElement('td');
		const tdDetails = document.createElement('td');
		const moreButton = document.createElement('button');

		tdId.textContent = photo.id;
		tdRoverName.textContent = photo.rover.name;
		tdCamera.textContent = photo.camera.name;
		moreButton.textContent = 'More';
		moreButton.addEventListener('click', () => setPhotoData(photo));
		tdDetails.appendChild(moreButton);

		row.appendChild(tdId);
		row.appendChild(tdRoverName);
		row.appendChild(tdCamera);
		row.appendChild(tdDetails);

		tableBody.appendChild(row);
	}
}

function setPhotoData(photo) {
	console.log(photo);
	image.src = photo.img_src;
	earthP.textContent += photo.earth_date;
	martianP.textContent += photo.rover.landing_date;
	idP.textContent += photo.id;
}

function searchByDate() {
	const dateFilter = document.getElementById('date-input').value;

	if (dateFilter) {
		date = dateFilter;
		tableBody.innerHTML = '';
		loadData();
	}
}

function nextPage() {
	tableBody.innerHTML = '';
	page++;
	loadData();
}

function previousPage() {
	if (page > 1) {
		tableBody.innerHTML = '';
		page--;
		loadData();
	}
}

window.onload = function () {
	loadData();
};
