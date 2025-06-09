import React from "react";
import Sidebar from "../SideBar";
import type { Interview } from "../../types/types";

const InterviewsPage: React.FC = () => {
  const interviews: Interview[] = [];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
    
        <header>
          <h1>المقابلات</h1>
          <p>في هذه الصفحة، نستعرض مقابلات حصرية مع عائلات الشهداء ورفاقهم وشهادات حيّة عن بطولاتهم.</p>
        </header>
        <div>
          <button>
            إضافة مقابلة
          </button>
          <button>
            بحث عن مقابلة
          </button>
        </div>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {interviews.map((interview, index) => (
            <div key={index}>
              <h3>{interview.title}</h3>
              <p><strong>تاريخ المقابلة:</strong> {interview.date}</p>
              <button>قراءة المزيد</button>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer>
          <p>سنظل أوفياء لدماء الشهداء، نحمل وصاياهم ونروي قصصهم للأجيال القادمة.</p>
        </footer>
    </div>
  );
};

export default InterviewsPage;