import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Martyr } from "../../types/types";

const MartyrPage: React.FC = () => {

    const [martyr, setMartyr] = useState<Martyr | null>(null);

    const calculateAge = (birth: string, death: string): number => {
        const birthDate = new Date(birth);
        const deathDate = new Date(death);
        let age = deathDate.getFullYear() - birthDate.getFullYear();
        const m = deathDate.getMonth() - birthDate.getMonth();
        
        if (m < 0 || (m === 0 && deathDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

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
                        <li><strong>العمر عند الاستشهاد:</strong> {martyr ? calculateAge(martyr.birth_date, martyr.martyrdom_date) : "غير متوفر"} سنة</li>
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
