var testimonials = [
    {
      "name": "Brian Otieno",
      "location": "Nairobi",
      "testimonial": "I've been using these predictions for months, and my accuracy has improved significantly. Highly recommended!",
      "rating": 5
    },
    {
      "name": "Faith Kamau",
      "location": "Mombasa",
      "testimonial": "I was skeptical at first, but after winning several bets, I can confidently say this platform is legit!",
      "rating": 4.5
    },
    {
      "name": "Samuel Mwangi",
      "location": "Kisumu",
      "testimonial": "Great analysis and well-researched predictions. I appreciate the effort put into this!",
      "rating": 5
    },
    {
      "name": "Esther Wanjiru",
      "location": "Nakuru",
      "testimonial": "The VIP section is worth every penny. I've had more wins than losses since I joined.",
      "rating": 4.8
    },
    {
      "name": "Kevin Njoroge",
      "location": "Eldoret",
      "testimonial": "Reliable predictions! I use them daily, and they've helped me make better betting decisions.",
      "rating": 4.7
    },
    {
      "name": "Mercy Achieng",
      "location": "Thika",
      "testimonial": "Finally, a prediction site that delivers what it promises! My winning streak has never been this good.",
      "rating": 5
    },
    {
      "name": "Dennis Mutua",
      "location": "Machakos",
      "testimonial": "I love the expert analysis. The insights provided are top-notch and very helpful!",
      "rating": 4.9
    },
    {
      "name": "Cynthia Mwende",
      "location": "Nyeri",
      "testimonial": "I used to struggle with betting, but this site has helped me understand how to make informed decisions.",
      "rating": 4.6
    },
    {
      "name": "James Kibet",
      "location": "Kericho",
      "testimonial": "Amazing platform! Their predictions have given me an edge over bookies.",
      "rating": 5
    },
    {
      "name": "Sharon Naliaka",
      "location": "Kakamega",
      "testimonial": "I never used to trust prediction sites, but this one has proven to be accurate and reliable.",
      "rating": 4.7
    },
    {
      "name": "Patrick Ochieng",
      "location": "Siaya",
      "testimonial": "Best football predictions! My betting game has never been better.",
      "rating": 5
    },
    {
      "name": "Lucy Wanjiku",
      "location": "Nyahururu",
      "testimonial": "I’ve won multiple bets using these predictions. Truly amazing work!",
      "rating": 4.8
    },
    {
      "name": "Joseph Karani",
      "location": "Meru",
      "testimonial": "Very insightful and well-researched predictions. I highly recommend it!",
      "rating": 5
    },
    {
      "name": "Janet Mutheu",
      "location": "Kitui",
      "testimonial": "Easy to use and very accurate. I've had more wins since I started using this site.",
      "rating": 4.9
    },
    {
      "name": "Collins Kiptoo",
      "location": "Bomet",
      "testimonial": "I love the VIP section. The odds are always on point!",
      "rating": 4.6
    },
    {
      "name": "Mary Nduta",
      "location": "Naivasha",
      "testimonial": "I appreciate the effort put into research. These predictions are top-notch!",
      "rating": 5
    },
    {
      "name": "Peter Waweru",
      "location": "Murang'a",
      "testimonial": "Since I joined, my betting experience has changed for the better. Highly recommended!",
      "rating": 4.7
    },
    {
      "name": "Rose Atieno",
      "location": "Homa Bay",
      "testimonial": "This site has given me the confidence to bet wisely and win more often.",
      "rating": 4.8
    },
    {
      "name": "Emmanuel Muli",
      "location": "Embu",
      "testimonial": "Fantastic service! The predictions are well-calculated and precise.",
      "rating": 5
    },
    {
      "name": "Dorcas Chebet",
      "location": "Nandi",
      "testimonial": "I’ve followed their predictions for a while now, and they are really accurate!",
      "rating": 4.9
    }
  ]

const Testimonials = () => {  
  return (
    <div className="testimonials-page w-full mb-30 gap-10 mx-auto">
      <div className="testimonials-header py-5 mb-5 w-[98%] rounded-lg mx-auto">
          <h1 className="font-bold text-3xl md:text-4xl">TESTIMONIALS</h1>
          <h1 className="text-2xl md:text-3xl font-bold my-3 md:my-5">What Our <span className="font-bold text-amber-300">Clients Say</span> </h1>
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-2 testimonials w-full mx-auto gap-5 bg-[#000435] py-10" style={{ listStyleType: "none" }}>
        {[...new Set(Array.from({ length: 10 }, () => Math.floor(Math.random() * testimonials.length)))]
        .map((index) => {
          const testimonial = testimonials[index]; // Get the actual testimonial object
          return (
            <li key={index} className="testimonial-item w-[90%] mx-auto">
              <div className="testimonial border border-gray-200 mx-auto p-5 rounded-lg bg-white shadow-md shadow-amber-400">
                <p className="quote italic">“{testimonial.testimonial}”</p>
                <p className="name font-semibold text-gray-900">{testimonial.name}</p>
                <p className="location text-sm text-gray-500">{testimonial.location}</p>
                <div className="rating text-yellow-500 mt-2">
                  {"★".repeat(testimonial.rating) + "☆".repeat(5 - testimonial.rating)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default Testimonials