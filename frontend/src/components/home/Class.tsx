import React, { useState, useEffect } from "react";
import "../../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GetClasses } from "../../service/https/class";


interface Class {
    ID: number;
    ClassName: string;
    ClassPic: string;
    Deets: string;
    StartDate: string;
    EndDate: string;
    Trainer: Trainer;
    ParticNum: number;
    ClassType: ClassType;
}

interface ClassType {
    ID: number;
    Name: string;
}

interface Trainer {
    ID: number;
    Name: string;
}

const Class: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);

    const fetchClasses = async () => {
        try {
            const res = await GetClasses();
            if (res) {
                setClasses(res);
            }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    return (
        <div className="text-white " style={{ backgroundImage: "radial-gradient(circle, rgba(20,20,30,1) 0%, rgba(0,0,0,1) 100%)" }}>
            <div className="container pt-3">
                <div className="w-3/4 m-auto">
                    <div className="max-h-screen">
                        <h1 data-aos="zoom-in" data-aos-delay="100" className="  font-bold italic text-white text-center mb-4 text-4xl">
                            {" "}
                            OUR CLASS
                        </h1>
                        <Slider {...settings}>
                            {classes.map((item, index) => (
                                <div data-aos="zoom-in" data-aos-delay="300" key={index} className="bg-traparent pr-3">
                                    <div>
                                        <img src={item.ClassPic} className="w-[500px] h-[200px] object-cover " alt={item.ClassName} />
                                    </div>
                                    <div className="p-6 ">
                                        <h1 className="text-green1 mb-1 text-lg">{item.ClassType.Name}</h1>
                                        <h1 className="text-green3  text-xl">{item.ClassName}</h1>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Class;
