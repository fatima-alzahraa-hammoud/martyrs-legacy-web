import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Martyr {
    name: string;
    first_name: string;
    last_name: string;
    father_name: string;
    mother_name: string;
    place_of_birth: string;
    birth_date: string;
    martyrdom_date: string;
    burial_place: string;
    status: string;
    marital_status: string;
    nb_of_childen: number;
    related_phone_nb: string;
    image: string;
    bio: string;
    famous_quote: string;
}

const MartyrPage: React.FC = () => {

    const [martyr, setMartyr] = useState<Martyr | null>(null);

    return (
        <div>
            <div>
                {/* صورة الشهيد */}
                <div>
                    <img
                        src={martyr?.image}
                        alt={martyr?.name}
                    />
                    <div>
                        <h2>{martyr?.name}</h2>
                        <p>سلامٌ على من صدق الوعد ومضى</p>
                    </div>
                </div>

                {/* التفاصيل */}
                <div>
                    <h3>المعلومات الأساسية</h3>
                    <ul>
                        <li><strong>الاسم الكامل:</strong> {martyr?.first_name} {martyr?.last_name}</li>
                        <li><strong>اسم الأب:</strong> {martyr?.father_name}</li>
                        <li><strong>اسم الأم:</strong> {martyr?.mother_name}</li>
                        <li><strong>تاريخ الولادة:</strong> {martyr?.birth_date}</li>
                        <li><strong>مكان الولادة:</strong> {martyr?.place_of_birth}</li>
                        <li><strong>تاريخ الاستشهاد:</strong> {martyr?.martyrdom_date}</li>
                        <li><strong>مكان الدفن:</strong> {martyr?.burial_place}</li>
                        <li><strong>الحالة:</strong> {martyr?.status}</li>
                        <li><strong>الحالة الاجتماعية:</strong> {martyr?.marital_status}</li>
                        <li><strong>عدد الأولاد:</strong> {martyr?.nb_of_childen}</li>
                    </ul>

                    <div>
                        <h3>نبذة عن الشهيد</h3>
                        <p>{martyr?.bio}</p>
                    </div>

                    <div>
                        <h3>كلمة شهيرة</h3>
                        <p>
                            {martyr?.famous_quote ? martyr.famous_quote : ""}
                        </p>
                    </div>


                    <div>
                        <h3>وصية الشهيد</h3>
                        <Link
                            to="/martyr-will"
                        >
                            عرض الوصية كاملة
                        </Link>
                    </div>

                    <p>
                        لن ننسى... وسنُكمل دربكم ما حيينا
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MartyrPage;
