import React, { useState, useEffect } from "react";
import { X, User, Calendar, MapPin, Heart, Quote, FileText, Home, Phone, Save, Upload } from "lucide-react";
import type { Martyr } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";

interface EditMartyrDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onMartyrUpdated: (martyr: Martyr) => void;
    martyr: Martyr | null;
}

const EditMartyrDialog: React.FC<EditMartyrDialogProps> = ({ isOpen, onClose, onMartyrUpdated, martyr }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        father_name: "",
        mother_name: "",
        last_name: "",
        description: "",
        place_of_birth: "",
        birth_date: "",
        martyrdom_date: "",
        burial_place: "",
        status: "شهيد",
        marital_status: "",
        nb_of_children: 0,
        related_phone_nb: "",
        image: "",
        bio: "",
        famous_quote: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // Populate form with martyr data when dialog opens
    useEffect(() => {
        if (martyr && isOpen) {
            setFormData({
                first_name: martyr.first_name || "",
                father_name: martyr.father_name || "",
                mother_name: martyr.mother_name || "",
                last_name: martyr.last_name || "",
                description: martyr.description || "",
                place_of_birth: martyr.place_of_birth || "",
                birth_date: martyr.birth_date || "",
                martyrdom_date: martyr.martyrdom_date || "",
                burial_place: martyr.burial_place || "",
                status: martyr.status || "شهيد",
                marital_status: martyr.marital_status || "",
                nb_of_children: martyr.nb_of_children || 0,
                related_phone_nb: martyr.related_phone_nb || "",
                image: (martyr.image && typeof martyr.image === "object" && "file_path" in martyr.image) ? martyr.image.file_path : "",
                bio: martyr.bio || "",
                famous_quote: martyr.famous_quote || ""
            });
            setImagePreview(
                martyr.image && typeof martyr.image === "object" && "file_path" in martyr.image
                    ? `http://127.0.0.1:8000/storage/${martyr.image.file_path}` // Add the full URL here
                    : ""
            );
            setImageFile(null);
        }
    }, [martyr, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'nb_of_childen' ? parseInt(value) || 0 : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!martyr) return;

        setIsLoading(true);

        try {
            // Create the updated martyr data object
            const martyrData = {
                ...formData
            };

            const response = await requestApi({
                route: `/martyr/${martyr.id}`,
                method: requestMethods.PUT,
                body: martyrData,
            });

            if (response.status === "success") {
                const updatedMartyr = await response.data;
                onMartyrUpdated(updatedMartyr);
                onClose();
            } else {
                console.error("Failed to update martyr:", response.message);
                alert("فشل في تحديث بيانات الشهيد. يرجى المحاولة مرة أخرى.");
            }
        } catch (error) {
            console.error("Error updating martyr:", error);
            alert("حدث خطأ أثناء تحديث بيانات الشهيد. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        // Reset form and image state
        setImageFile(null);
        setImagePreview("");
    };

    if (!isOpen || !martyr) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-amber-200 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-200 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-amber-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-amber-800 font-arabic">تعديل بيانات الشهيد</h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-10 h-10 bg-amber-100 hover:bg-amber-200 rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <X className="h-5 w-5 text-amber-600" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Main Form Fields */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Basic Information */}
                            <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-2xl p-6 border border-amber-200">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                    <User className="h-6 w-6 text-amber-600" />
                                    <h3 className="text-2xl font-bold text-amber-800 font-arabic">المعلومات الأساسية</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">الاسم الأول *</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                placeholder="أدخل الاسم الأول"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">اسم الأب *</label>
                                            <input
                                                type="text"
                                                name="father_name"
                                                value={formData.father_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                placeholder="أدخل اسم الأب"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">اسم الأم</label>
                                            <input
                                                type="text"
                                                name="mother_name"
                                                value={formData.mother_name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                placeholder="أدخل اسم الأم"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">اسم العائلة *</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                placeholder="أدخل اسم العائلة"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">تاريخ الولادة</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="birth_date"
                                                    value={formData.birth_date}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800"
                                                />
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">مكان الولادة</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="place_of_birth"
                                                    value={formData.place_of_birth}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                    placeholder="أدخل مكان الولادة"
                                                />
                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-red-700 font-medium mb-2 font-arabic">تاريخ الاستشهاد *</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="martyrdom_date"
                                                    value={formData.martyrdom_date}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-red-800"
                                                />
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">مكان الدفن</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="burial_place"
                                                    value={formData.burial_place}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                    placeholder="أدخل مكان الدفن"
                                                />
                                                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">الحالة الاجتماعية</label>
                                            <div className="relative">
                                                <select
                                                    name="marital_status"
                                                    value={formData.marital_status}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                >
                                                    <option value="">اختر الحالة الاجتماعية</option>
                                                    <option value="أعزب">أعزب</option>
                                                    <option value="متزوج">متزوج</option>
                                                    <option value="مطلق">مطلق</option>
                                                    <option value="أرمل">أرمل</option>
                                                </select>
                                                <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-amber-700 font-medium mb-2 font-arabic">عدد الأولاد</label>
                                            <input
                                                type="number"
                                                name="nb_of_children"
                                                value={formData.nb_of_children}
                                                onChange={handleInputChange}
                                                min="0"
                                                className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-2xl p-6 border border-amber-200">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                    <Phone className="h-6 w-6 text-amber-600" />
                                    <h3 className="text-2xl font-bold text-amber-800 font-arabic">معلومات الاتصال</h3>
                                </div>
                                
                                <div>
                                    <label className="block text-amber-700 font-medium mb-2 font-arabic">رقم هاتف ذوي الشهيد</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="related_phone_nb"
                                            value={formData.related_phone_nb}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 text-right"
                                            placeholder="أدخل رقم الهاتف"
                                        />
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Biography and Description */}
                            <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-2xl p-6 border border-amber-200">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                    <FileText className="h-6 w-6 text-amber-600" />
                                    <h3 className="text-2xl font-bold text-amber-800 font-arabic">السيرة والوصف</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-amber-700 font-medium mb-2 font-arabic">وصف مختصر</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right resize-none"
                                            placeholder="أدخل وصفاً مختصراً عن الشهيد"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-amber-700 font-medium mb-2 font-arabic">السيرة الذاتية</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full px-4 py-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right resize-none"
                                            placeholder="أدخل السيرة الذاتية التفصيلية للشهيد"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Image Upload */}
                            <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                    <Upload className="h-6 w-6 text-amber-600" />
                                    <h3 className="text-xl font-bold text-amber-800 font-arabic">صورة الشهيد</h3>
                                </div>
                                
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-200 bg-amber-50">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="معاينة الصورة"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="h-16 w-16 text-amber-400" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="cursor-pointer bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-lg transition-colors duration-200 font-arabic">
                                        تغيير الصورة
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Famous Quote */}
                            <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                    <Quote className="h-6 w-6 text-amber-600" />
                                    <h3 className="text-xl font-bold text-amber-800 font-arabic">كلمة شهيرة</h3>
                                </div>
                                
                                <textarea
                                    name="famous_quote"
                                    value={formData.famous_quote}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 font-arabic text-right resize-none"
                                    placeholder="أدخل كلمة أو قولاً مشهوراً للشهيد"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-amber-400 disabled:to-amber-500 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:scale-100 font-arabic flex items-center justify-center space-x-2 rtl:space-x-reverse"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5" />
                                            <span>حفظ التعديلات</span>
                                        </>
                                    )}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-medium transition-colors duration-200 font-arabic"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMartyrDialog;