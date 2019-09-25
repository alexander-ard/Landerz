function pageClass() {

    this.load = function () {
        getTestimonials();
    };

    function getTestimonials() {

        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(function (testimonials) {
                getUsers(testimonials.data);
            })
            .catch(function (error) {});
    }

    function getUsers(testimonials) {

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(function (users) {
                matchUsersTestimonials(testimonials, users.data);
            })
            .catch(function (error) {});
    }

    function matchUsersTestimonials(testimonials, users) {
        let userTestimonials = [];
        let index = 0;

        users.forEach(u => {
            testimonials.filter(t => t.userId == u.id).forEach(x => {
                if (!userTestimonials.filter(t => t.userName == u.name).length) {
                    userTestimonials.push({
                        userName: u.name,
                        body: x.body,
                        index: index,
                        picture: Math.floor(Math.random() * (4 - 1 + 1)) + 1
                    });

                    index++;
                }
            });
        });

        generateTestimonialHTML(userTestimonials);
    }

    function generateTestimonialHTML(userTestimonials) {
        userTestimonials.forEach(testimonial => {
            generateItemTestimonialHTML(testimonial);
            generateIndicatorHTML(testimonial);
        });

    }

    function generateItemTestimonialHTML(testimonial) {

        let testimonials = document.getElementById("testimonial-items");
        let activeClass = testimonial.index == 0 ? " active " : "";

        testimonials.innerHTML += `
        <div class="carousel-item` + activeClass + `">
            <div class="flex-grid">
                <div class="col card">
                    <img src="../assets/images/person_` + testimonial.picture + `.jpg" alt="Amalia G."
                    class="testimonial-picture circle mx-auto">
                    <p class="italic mx-auto testimonial-body">
                        "` + testimonial.body + `."
                    </p>
                    <span class="bold mx-auto">
                        ` + testimonial.userName + `
                    </span>
                </div>
            </div>
        </div>`;

    }

    function generateIndicatorHTML(testimonial) {

        let activeClass = testimonial.index == 0 ? " class='active' " : "";
        let indicators = document.getElementById("testimonial-indicators");

        indicators.innerHTML +=
            `<li data-target="#testimonialsCarousel" ` + activeClass + ` data-slide-to="` + testimonial.index + `"></li>`;
    }
}


var page = new pageClass();