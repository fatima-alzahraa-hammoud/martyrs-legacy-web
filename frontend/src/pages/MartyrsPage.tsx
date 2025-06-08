import React from "react";

const MartyrsPage: React.FC=()=>{

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
      <section>
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