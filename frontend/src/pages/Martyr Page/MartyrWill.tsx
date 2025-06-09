import React, { useState } from "react";
import type { MartyrWill } from "../../types/types";

const recipientLabels: Record<string, string> = {
    mother: "الأم",
    father: "الأب",
    wife: "الزوجة",
    husband: "الزوج",
    son: "الابن",
    daughter: "الابنة",
    brother: "الأخ",
    sister: "الأخت",
    uncle: "العم",
    aunt: "العمة",
    general_public: "الجمهور العام",
};

const WillPage: React.FC = () => {
    const [will, setWill] = useState<MartyrWill | null>(null);
    const [parsedContent, setParsedContent] = useState<Record<string, string>>({});

    return (
        <div>
            <h1>{will?.title}</h1>
            <p>
                {will?.description}
            </p>

            <section>
                <h2>
                    محتوى الوصية
                </h2>

                {Object.keys(parsedContent).length === 0 && (
                    <p>لا توجد رسائل.</p>
                )}

                {Object.entries(parsedContent).map(([recipient, message]) => (
                    <div
                        key={recipient}
                    >
                        <h3>
                            {recipientLabels[recipient] || recipient}
                        </h3>
                        <p>{message}</p>
                    </div>
                ))}
            </section>

            <footer>
                تاريخ الوصية:{" "}
                {will?.date
                ? new Date(will.date).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    })
                : "غير متوفر"}
            </footer>
        </div>
    );
};

export default WillPage;
