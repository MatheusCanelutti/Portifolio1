document.addEventListener('DOMContentLoaded', (event) => {
    // console.log("DOM loaded");

    const card = {
        image: document.querySelector('#card-img').src,
        title: document.querySelector('#card-title').textContent,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quam, pariatur at consectetur corporis ipsam reiciendis eius nisi et vel tempore enim eaque quo sequi cumque hic ullam praesentium veritatis?",
        address: "Av Puta que pariu, 69"
    };
    const viewDetails = document.querySelector('#match-details');
    const modalElement = $('#card-modal');

    console.log(viewDetails);
    console.log(modalElement);
    console.log(card.image)

    if (viewDetails && modalElement) {
        viewDetails.addEventListener('click', () => {
            // Preenche os elementos do modal com os dados do card
            $('#modal-image').html(`<img src="${card.image}" alt="Movel"/>`);
            $('#modal-title').text(card.title);
            $('#modal-description').text(card.description);
            $('#modal-address').text(card.address);

            // Exibe o modal
            modalElement.modal({
                blurring: true
              })
            modalElement.modal('show');
        });
    } else {
        console.error("Button or Modal not found");
    }

    
});