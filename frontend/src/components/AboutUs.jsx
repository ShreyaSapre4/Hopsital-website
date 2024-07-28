import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../public/css/components/aboutus.scss";

function AboutUs() {
  const departmentsArray = [
    {
      name: "Cardiology",
      image:
        "https://img3.stockfresh.com/files/f/freesoulproduction/m/58/4702237_stock-vector-vector-human-heart-medical-symbol-of-cardiology.jpg",
      description:
        "Specializes in diagnosing and treating heart conditions and diseases.",
    },
    {
      name: "Dermatology",
      image:
        "https://images.squarespace-cdn.com/content/v1/5c5cac6416b64026cb4606d9/1555602676858-O8U3B7H4VUY6O170PDP2/gen-med-derm-square.jpg",
      description: "Focuses on treating skin, hair, and nail disorders.",
    },
    {
      name: "Neurology",
      image:
        "https://img.freepik.com/premium-photo/brain-image-neurology-concept-front-view-with-neuron-connections-effect-3d-illustration_717906-1230.jpg?w=2000",
      description: "Treats disorders of the brain and nervous system.",
    },
    {
      name: "Obstetrics and Gynecology",
      image:
        "https://intermountainhealthcare.org/-/media/images/enterprisesections/all-service-line-images/prenatal-diagnostics.jpg?mw=1600",
      description:
        "Cares for women's reproductive health, pregnancy, and childbirth.",
    },
    {
      name: "Orthopedics",
      image:
        "https://static.vecteezy.com/system/resources/previews/000/483/651/original/vector-orthopedics-design-concept.jpg",
      description:
        "Deals with the correction of deformities of bones or muscles.",
    },
    {
      name: "Urology",
      image:
        "https://th.bing.com/th/id/OIP.ohduR7mlK8jJxR33C9wjoAHaHa?w=500&h=500&rs=1&pid=ImgDetMain",
      description: "Focuses on the urinary tract and male reproductive organs.",
    },
  ];

  return (
    <div className="departments">
      <h1>Departments</h1>
      <div className="grid">
        {departmentsArray?.map((item, index) => (
          <div>
            <img src={item.image}></img>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <a href={`/${item.name}`}>Learn more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
