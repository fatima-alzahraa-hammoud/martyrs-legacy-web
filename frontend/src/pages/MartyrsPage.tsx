import React from "react";
import { useState } from "react";
import SideBar from "./Sidebar";

type Martyr = {
  id: number;
  first_name: string;
  father_name: string;
  last_name: string;
  full_name: string
  martyrdom_date: string;
  image_url: string;
};

const MartyrsPage: React.FC=()=>{
  const [martyrs, setMartyrs] = useState<Martyr[]>([]);

    return(
        <div>
            <header>
        <h1>من الشهادة يولد المجد</h1>
        <h2>دماؤهم منارتنا، وأسماؤهم عهد لا يُنسى</h2>
        <p>
          نكرّم في هذه الصفحة أبطالنا الذين ارتقوا في سبيل الله والوطن.
          نسرد قصصهم ونخلّد ذكراهم ليبقى نهجهم حيًّا في قلوبنا ووجداننا.
        </p>
      </header>
      <SideBar />
      <div>
          <button>
            إضافة شهيد
          </button>
          <button>
            بحث عن شهيد
          </button>
        </div>
      <section>
        <h2>قائمة الشهداء</h2>
        {martyrs.map((martyr) => (
          <div key={martyr.id}>
            <img src={martyr.image_url} alt={martyr.full_name} />
            <h3>{martyr.full_name}</h3>
            <p>تاريخ الاستشهاد: {martyr.martyrdom_date}</p>
            <button>اقرأ المزيد</button>
          </div>
        ))}
      </section>

        </div>
    );
}

export default MartyrsPage