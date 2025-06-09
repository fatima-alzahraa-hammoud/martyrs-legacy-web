import React from "react";
import Sidebar from "../SideBar";
import type { MartyrWill } from "../../types/types";

const MartyrsWillsPage: React.FC = () => {
  const [wills, setWills] = React.useState<MartyrWill[]>([
  ]);

  return (
    <div>
      <Sidebar />
      <div >
       
        <header>
          <h1>وصايا الشّهداء</h1>
          <p>كلماتهم الأخيرة أمانة في أعناقنا...</p>
        </header>

    
        <div>
          <button>إضافة وصيّة</button>
          <button>بحث عن وصيّة</button>
        </div>


        <div>
          {wills.map((will) => (
            <div key={will.id} >
              <h3> اسم الشّهيد: </h3>
              <p>تاريخ الاستشهاد: </p>
              <p>تاريخ الوصيّة: </p>

              <p>نص الوصيّة: </p>
              
              <button>قراءة كاملة</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer>
          <p>وصايا الشّهداء، دربنا للنصر والثبات.</p>
        </footer>
      </div>
    </div>
  );
};

export default MartyrsWillsPage;