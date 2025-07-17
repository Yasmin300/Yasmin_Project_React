import React from "react";
import './about.css';
export default function AboutPage() {
    return (
        <div className="container about py-5">
            <h1 className="display-4 text-center mb-4">על האתר</h1>
            <p className="lead text-center mb-5">
                ברוכים הבאים לאפליקציה החדשנית שלנו : פלטפורמה דינמית וחכמה לפרסום, ניהול, וחשיפה של כרטיסי עסקים.
                כאן תוכלו לחוות עולם דיגיטלי בו כל משתמש נהנה מממשק נוח, מאובטח, ורספונסיבי , שמותאם במיוחד לכם.
            </p>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">מטרת האתר</h5>
                            <p className="card-text">
                                מטרת האפליקציה היא להעניק לבעלי עסקים כלים פשוטים אך עוצמתיים ליצירת כרטיסי ביקור אינטראקטיביים. הגולשים יכולים לדפדף, לחפש ולשמור מועדפים, בעוד בעלי עסקים יכולים לערוך, להוסיף ולמחוק תוכן בהתאם להרשאות.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">למי זה מתאים?</h5>
                            <p className="card-text">
                                הפלטפורמה מתאימה לכולם: גולשים סקרנים, בעלי עסקים קטנים, יזמים, וגם לקוחות פוטנציאליים המחפשים שירותים מעניינים באזורם. הרישום פשוט ומהיר, והמערכת שמה דגש על חווית משתמש ונגישות מלאה.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">טכנולוגיות בשימוש</h5>
                            <p className="card-text">
                                המערכת נבנתה בטכנולוגיות המובילות בשוק: ReactJS בצד לקוח, REST API בצד שרת, ספריית Joi לולידציה מתקדמת,ועיצוב בעזרת Bootstrap. הכל עטוף בעיצוב רספונסיבי ונקי.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">התממשקות עם המערכת</h5>
                            <p className="card-text">
                                ניתן ליצור כרטיסים, לערוך אותם, לסמן כמועדפים, ואף לנווט אל מיקום העסק ישירות מהמפה. כל פעולה מתבצעת בצורה מאובטחת באמצעות JWT Token, כאשר ההרשאות נגזרות מהמידע המוצפן בו.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <p className="text-muted aboutLast">
                    הפרויקט פותח כחלק מפרויקט מסכם בקורס React , וממחיש את כל היכולות שנלמדו, מרמה בסיסית ועד מורכבות מתקדמת בצד לקוח.
                </p>
            </div>
        </div>
    );
}
