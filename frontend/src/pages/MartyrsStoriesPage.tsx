import React from "react";
import Sidebar from "../components/Sidebar";

type Story = {
  martyr_id: number;
  title: string;
  description: string;
};

const MartyrsStoriesPage: React.FC = () => {
  const [stories, setStories] = React.useState<Story[]>([
    
  ]);

  return (
    <div>
      <Sidebar />
      <div>
       
        <header>
          <h1>قصص الشهداء</h1>
          <p>من حياتهم... نستمد العزم والصبر والإيمان</p>
        </header>

        
        <div>
          <button>إضافة قصّة</button>
          <button>بحث عن قصّة</button>
        </div>

       
        <div>
          {stories.map((story, index) => (
            <div key={index}>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <button>قراءة القصة</button>
            </div>
          ))}
        </div>

        
        <footer>
          <p>قصص الشهداء، دروس في البطولة والوفاء.</p>
        </footer>
      </div>
    </div>
  );
};

export default MartyrsStoriesPage;