function SetCss() {
    var css = '.slides { position: relative } .controls { position: relative } .indicators { display: flex };';
    var head = document.querySelector('head');
    var style = document.createElement('style')
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
};

var prevChildIndex = null;
var handler = function OnItemClick(e) {
    var m = e.target;
    if (m.classList.contains('indicators__item')) {
        var parent = document.querySelector('.indicators');
        var currentIndex = +e.target.getAttribute('data-slide-to');
        parent.childNodes[currentIndex].setAttribute('style', 'background-color: red;');
        //
        if (prevChildIndex !== null) {
            parent.childNodes[prevChildIndex].setAttribute('style', null);
        }
        prevChildIndex = currentIndex;
    }
}

var createCarousel = function (slidesCount) {
    //CSS
    SetCss();

    var root = document.querySelector('.carousel');

    //slides
    let slidesContainer = document.createElement('ul');
    slidesContainer.setAttribute('class', 'slides');

    slidesContainer.AddItem = function (index) {
        //slides
        let childItem = document.createElement('li');
        childItem.setAttribute('class', 'slides__item');
        if (index === 0) childItem.classList.add('active');
        //a
        let childLink = document.createElement('a');
        childLink.setAttribute('href', '#');
        //Append
        childItem.appendChild(childLink);
        this.appendChild(childItem);
    }

    //indicators
    let indicatorsContainer = document.createElement('div');
    indicatorsContainer.setAttribute('class', 'indicators');
    indicatorsContainer.addEventListener('click', handler);
    indicatorsContainer.AddItem = function (index) {
        let childItem = document.createElement('span');
        childItem.innerText = index;
        childItem.setAttribute('class', 'indicators__item');
        if (index === 0) childItem.classList.add('active');
        childItem.setAttribute('data-slide-to', index);
        this.appendChild(childItem);
    }

    //controls
    let controlsContainer = document.createElement('div');
    controlsContainer.setAttribute('class', 'controls');
    controlsContainer.AddItem = function (index) {
        if (index > 2) return;
        let childItem = document.createElement('div');
        childItem.setAttribute('class', 'controls__item');

        let childLink = document.createElement('i');
        childLink.setAttribute('class', 'fas');

        childItem.appendChild(childLink);
        switch (index) {
            case 0:
                childItem.classList.add('controls__prev');
                childLink.classList.add('fa-chevron-left');
                break;
            case 1:
                childItem.classList.add('controls__next');
                childLink.classList.add('fa-chevron-right');
                break;
            case 2:
                childItem.classList.add('controls__pause');
                childLink.classList.add('fa-play');
                break;
        }
        childItem.appendChild(childLink);
        this.appendChild(childItem);
    }


    for (let i = 0; i < slidesCount; i++) {
        slidesContainer.AddItem(i);
        indicatorsContainer.AddItem(i);
        controlsContainer.AddItem(i);
    }
    root.appendChild(slidesContainer);
    root.appendChild(indicatorsContainer);
    root.appendChild(controlsContainer);
};
createCarousel(5);