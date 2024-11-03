let page = 1;
let date = '2015-07-2';
let image = document.getElementById('photo');

function loadData() {
	fetch(
		`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=yPGC078gVH2hGjSYSTuKaSdHZaa4gBMm2doFQrNm&page=${page}#`
	)
		.then((response) => response.json())
		.then(setTableData);
}

function setTableData(data) {
	const tableBody = document.getElementById('table-body');

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
		tdDetails.appendChild(moreButton);

		row.appendChild(idTd);
		row.appendChild(idRoverName);
		row.appendChild(idCamera);
		row.appendChild(idDetails);

		tableBody.appendChild(row);
	}
}

function setPhotoData(photo) {
	image.src = photo.img_src;
}

function nextPage() {
	page++;
	loadData();
}

function previousPage() {
	if (page > 1) {
		page--;
		loadData();
	}
}

window.onload = function () {
	loadData();
};
