import React, { useState, useRef, useEffect } from 'react';

const DatePicker = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAgeWarning, setShowAgeWarning] = useState(false);
    const [selectedDate, setSelectedDate] = useState({
        day: value ? new Date(value).getDate() : 1,
        month: value ? new Date(value).getMonth() + 1 : 1,
        year: value ? new Date(value).getFullYear() : 2000
    });

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const containerRef = useRef(null);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const paddedDays = [...Array(5).fill(''), ...days, ...Array(5).fill('')];
    const paddedMonths = [...Array(5).fill(''), ...months, ...Array(5).fill('')];
    const paddedYears = [...Array(5).fill(''), ...years, ...Array(5).fill('')];

    const checkAge = (date) => {
        const today = new Date();
        const birthDate = new Date(date.year, date.month - 1, date.day);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const handleDateSelect = () => {
        const age = checkAge(selectedDate);
        
        if (age < 18) {
            setShowAgeWarning(true);
            return;
        }

        const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
        onChange(date.toISOString().split('T')[0]);
        setIsOpen(false);
    };

    const handleChangeDate = () => {
        setShowAgeWarning(false);
        requestAnimationFrame(() => {
            setIsOpen(true);
        });
    };

    const handleScroll = (ref, type) => {
        if (ref.current) {
            const element = ref.current;
            const itemHeight = 40;
            const centerPosition = element.scrollTop + element.clientHeight / 2;
            const selectedIndex = Math.round(centerPosition / itemHeight) - 5;
            
            let newValue;
            if (type === 'day') {
                newValue = days[selectedIndex];
            } else if (type === 'month') {
                newValue = selectedIndex + 1;
            } else {
                newValue = years[selectedIndex];
            }

            if (newValue !== undefined) {
                setSelectedDate(prev => ({
                    ...prev,
                    [type]: newValue
                }));
            }
        }
    };

    useEffect(() => {
        const scrollToSelected = (ref, value, items) => {
            if (ref.current) {
                const index = items.indexOf(value);
                const itemHeight = 40;
                ref.current.scrollTop = (index + 5) * itemHeight;
            }
        };

        scrollToSelected(dayRef, selectedDate.day, days);
        scrollToSelected(monthRef, selectedDate.month, Array.from({ length: 12 }, (_, i) => i + 1));
        scrollToSelected(yearRef, selectedDate.year, years);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const handleExit = () => {
        window.location.href = 'https://t.me/jordan_nigger_666_bot';
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                type="text"
                value={formatDate(new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day))}
                onClick={() => setIsOpen(true)}
                onTouchStart={() => setIsOpen(true)}
                className="w-full h-full bg-transparent text-white outline-none cursor-pointer"
            >
                <span>{formatDate(new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day))}</span>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-[343px] bg-[#022424] border border-[#233636] rounded-[8px] p-4">
                        <div className="flex justify-between w-full">
                            <div 
                                className="w-1/3 h-[200px] overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hide" 
                                ref={dayRef} 
                                onScroll={() => handleScroll(dayRef, 'day')}
                                onTouchMove={(e) => {
                                    e.preventDefault();
                                    handleScroll(dayRef, 'day');
                                }}
                                style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}
                            >
                                {paddedDays.map((day, index) => (
                                    <div 
                                        key={`day-${index}`}
                                        className={`h-[40px] flex items-center justify-center text-white snap-center ${
                                            selectedDate.day === day ? 'text-[#a1f69e] font-semibold text-[24px]' : ''
                                        }`}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div 
                                className="w-1/3 h-[200px] overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hide" 
                                ref={monthRef} 
                                onScroll={() => handleScroll(monthRef, 'month')}
                                onTouchMove={(e) => {
                                    e.preventDefault();
                                    handleScroll(monthRef, 'month');
                                }}
                                style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}
                            >
                                {paddedMonths.map((month, index) => (
                                    <div 
                                        key={`month-${index}`}
                                        className={`h-[40px] flex items-center justify-center text-white snap-center ${
                                            selectedDate.month === index - 4 ? 'text-[#a1f69e] font-semibold text-[24px]' : ''
                                        }`}
                                    >
                                        {month}
                                    </div>
                                ))}
                            </div>
                            <div 
                                className="w-1/3 h-[200px] overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hide" 
                                ref={yearRef} 
                                onScroll={() => handleScroll(yearRef, 'year')}
                                onTouchMove={(e) => {
                                    e.preventDefault();
                                    handleScroll(yearRef, 'year');
                                }}
                                style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}
                            >
                                {paddedYears.map((year, index) => (
                                    <div 
                                        key={`year-${index}`}
                                        className={`h-[40px] flex items-center justify-center text-white snap-center ${
                                            selectedDate.year === year ? 'text-[#a1f69e] font-semibold text-[24px]' : ''
                                        }`}
                                    >
                                        {year}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={handleDateSelect}
                            className="w-full h-[48px] mt-4 bg-[#a1f69e] text-[#022424] rounded-[400px] font-semibold text-[18px] flex items-center justify-center"
                        >
                            Готово
                        </button>
                    </div>
                </div>
            )}

            {showAgeWarning && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-[343px] bg-[#022424] border border-[#233636] rounded-[8px] p-4">
                        <h2 className="text-white text-center text-[18px] font-semibold mb-4">
                            Приложение доступно только совершеннолетним пользователям
                        </h2>
                        <div className="space-y-3">
                            <button
                                onClick={handleChangeDate}
                                className="w-full h-[48px] bg-[#a1f69e] text-[#022424] rounded-[400px] font-semibold text-[18px] flex items-center justify-center"
                            >
                                Изменить дату рождения
                            </button>
                            <button
                                onClick={handleExit}
                                className="w-full h-[48px] bg-[#022424] text-white border border-[#233636] rounded-[400px] font-semibold text-[18px] flex items-center justify-center"
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker; 