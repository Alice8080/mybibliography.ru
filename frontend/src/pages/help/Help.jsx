import { useEffect } from 'react';
import './help.scss';

const Help = () => {
    const block = document.createElement('div');
    block.innerHTML = `
        <div class="help-block">
        <!--noindex--><a href="https://www.homework.ru/order/form?partnerId=&partnersPictureId=484"><img src="https://hmwk.ru/partner/api/promo/promo-banners/484/partner-link" /></a><!--/noindex-->
        <br /><br />
        </div>
        <div class="transformer-form "
        style="color: #2C3F57;display: flex;align-items: center;flex-direction: column;border: 1px solid #DCE0E7;border-radius: 10px;box-sizing: border-box;font-family: 'Manrope', sans-serif;">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500&display=swap" rel="stylesheet">
        <script
            type="text/javascript">function setCursorPosition(e, t) { if (t.focus(), t.setSelectionRange) t.setSelectionRange(e, e); else if (t.createTextRange) { var n = t.createTextRange(); n.collapse(!0), n.moveEnd("character", e), n.moveStart("character", e), n.select() } } function mask(e) { 1 === this.value.length && (this.value = "+7" + this.value); var t = this.placeholder, n = 0, a = t.replace(/\D/g, ""), s = this.value.replace(/\D/g, ""); a.length >= s.length && (s = a), t = t.replace(/[_\d]/g, function (e) { return s.charAt(n++) || "_" }), this.value = t, (n = t.lastIndexOf(s.substr(-1))) < t.length && t != this.placeholder ? n++ : n = t.indexOf("_"), setCursorPosition(n, this) } window.addEventListener("DOMContentLoaded", function () { var form = document.getElementById("6bcfb75").querySelector("#Phone").addEventListener("input", mask, !1); }); function hwValidate6bcfb75(r) { var e = !0;["WorkType", "Topic", "Email", "Phone", "pp-checkbox"].forEach((r) => { var inputs = document.getElementById("6bcfb75").elements; var o = inputs[r]; if (!o.value || "" === o.value || !o.validity.valid) return o.classList.add("transformer-form-input-error"), void (e = !1); if ("WorkType" === r && document.querySelector("option[disabled].work-type-option").value === o.value) return o.classList.add("transformer-form-input-error"), void (e = !1); o.classList.remove("transformer-form-input-error"); }), e && r.submit(); } function checkOnResize6bcfb75() { var formContainer = document.getElementById("6bcfb75").parentElement; var width = formContainer.offsetWidth; if (width < 592 && !formContainer.classList.contains("modified-paddings")) { formContainer.classList.add("modified-paddings"); } else { if (width >= 592) { formContainer.classList.remove("modified-paddings"); } } }; document.getElementsByTagName("BODY")[0].onresize = checkOnResize6bcfb75; document.getElementsByTagName("BODY")[0].onload = checkOnResize6bcfb75; var availableExtentions = ["doc", "docx", "pdf", "png", "jpg", "jpeg", "xls", "xlsx", "zip", "rar", "7z", "pptx", "ppt", "pptm"]; function uploadFile6bcfb75(e) { var form = document.getElementById("6bcfb75"); if (0 !== e.files.length) { var r = form.getElementsByClassName("file-uploader-label")[0], s = e.files[0].name.split(".").pop(); -1 !== availableExtentions.indexOf(s) ? e.files[0].size / 1024 / 1024 > 10 ? r.classList.add("transformer-form-input-error") : ((form.getElementsByClassName("file-uploader-text")[0].innerHTML = e.files[0].name), r.classList.add("file-uploaded"), r.classList.remove("transformer-form-input-error")) : r.classList.add("transformer-form-input-error"); } } function removeFile6bcfb75(e, r) { var form = document.getElementById("6bcfb75"); r.preventDefault(), e.parentElement.classList.contains("file-uploaded") && ((form.getElementsByClassName("file-input")[0].value = null), (form.getElementsByClassName("file-uploader-text")[0].innerHTML = "Добавьте файл"), e.parentElement.classList.remove("file-uploaded")); }</script>
        <style type="text/css">
            .someinputs {
                display: none
            }

            .transformer-form {
                padding: 34px 60px 40px 60px;
                color: #2c3f57;
                max-width: 830px;
                min-width: 380px;
                display: flex;
                align-items: center;
                flex-direction: column;
                border: 1px solid #dce0e7;
                border-radius: 10px;
                box-sizing: border-box
            }

            .transformer-form-title {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 20px;
                line-height: 30px;
                text-align: center;
                letter-spacing: .65px
            }

            .transformer-form-description {
                position: relative;
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                font-size: 12px;
                letter-spacing: -.21px
            }

            .transformer-form-description::after {
                display: inline-block;
                position: absolute;
                left: 0;
                top: 5px;
                width: 20px;
                height: 20px
            }

            .transformer-form-form {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 0
            }

            .transformer-form-description::before {
                content: "";
                display: inline-block;
                min-height: 40px;
                min-width: 40px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, .15);
                border-radius: 100%;
                margin-right: 10px;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19.511' height='18.001' viewBox='0 0 19.511 18.001'%3E%3Cg transform='translate(-258.25 -1591.25)'%3E%3Cg transform='translate(259 1592)'%3E%3Cpath d='M0,6.2A3.1,3.1,0,0,0,3.1,3.1,3.1,3.1,0,0,0,0,0' transform='translate(13.085 1.005)' fill='none' stroke='%232c3f57' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1.5'/%3E%3Cpath d='M0,0A10.241,10.241,0,0,1,1.519.219,2.5,2.5,0,0,1,3.347,1.265a1.474,1.474,0,0,1,0,1.264A2.521,2.521,0,0,1,1.519,3.579' transform='translate(14.51 10.568)' fill='none' stroke='%232c3f57' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1.5'/%3E%3Cpath d='M6.428,0C9.9,0,12.857.525,12.857,2.623S9.914,5.266,6.428,5.266C2.961,5.266,0,4.741,0,2.642S2.942,0,6.428,0Z' transform='translate(0 11.235)' fill='none' stroke='%232c3f57' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1.5'/%3E%3Cpath d='M4.119,8.24a4.12,4.12,0,1,1,4.12-4.12A4.1,4.1,0,0,1,4.119,8.24Z' transform='translate(2.309 0)' fill='none' stroke='%232c3f57' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A") center no-repeat
            }

            .transformer-form-inputs-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin: 0 -15px
            }

            .transformer-form-input {
                width: 44%;
                box-sizing: border-box;
                border: 1px solid #dce0e7;
                border-radius: 5px;
                max-height: 40px;
                outline: 0;
                padding: 10px 15px;
                -webkit-appearance: none;
                font-size: 14px;
                flex-grow: 1;
                cursor: pointer;
                margin: 0 15px 30px 15px;
                background-color: #fff
            }

            #WorkType {
                appearance: none;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg id='Сгруппировать_7' data-name='Сгруппировать 7' transform='translate(-260 -10)'%3E%3Cg id='down-arrow' transform='translate(-115 -150)'%3E%3Cpath id='Контур_1' data-name='Контур 1' d='M1730,165l5,5,5-5' transform='translate(-1350 2.5)' fill='none' stroke='%232c3f57' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'/%3E%3Crect id='Прямоугольник_4' data-name='Прямоугольник 4' width='20' height='20' transform='translate(375 160)' fill='none'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A") no-repeat;
                background-position: calc(100% - 10px);
            }

            .transformer-form-input[type=number]::-webkit-inner-spin-button,
            .transformer-form-input[type=number]::-webkit-outer-spin-button {
                opacity: 1
            }

            .transformer-form-input:focus {
                border-color: #0f61fe
            }

            .transformer-form-input-error {
                border-color: #fe0000;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15.997' height='14.5' viewBox='0 0 15.997 14.5'%3E%3Cg transform='translate(-367 -222.5)'%3E%3Cpath d='M7.46,3.193a2.273,2.273,0,0,1,3.937,0l5.733,10.019a2.241,2.241,0,0,1-1.968,3.345H3.695a2.241,2.241,0,0,1-1.968-3.345l2-3.5Z' transform='translate(365.571 220.443)' fill='%23fe0000'/%3E%3Ccircle cx='0.8' cy='0.8' r='0.8' transform='translate(374.2 232)' fill='%23fff'/%3E%3Crect width='1.5' height='4' rx='0.75' transform='translate(374.25 227)' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E") no-repeat;
                background-position: calc(100% - 10px) center
            }

            #Requirements,
            .file-uploader-label {
                max-width: unset
            }

            .file-uploader-label {
                color: #778698;
                position: relative;
                width: 100%;
                background-color: #fafafd
            }

            .file-uploader-decorator {
                text-align: center;
                color: #fff;
                position: absolute;
                right: 10px;
                top: 10px;
                height: 20px;
                width: 20px;
                background-color: #0f61fe;
                border-radius: 100%;
                font-size: 18px;
                line-height: 1
            }

            .file-uploader-label.file-uploaded .file-uploader-decorator {
                font-weight: 700;
                text-align: center;
                color: #2c3f57;
                right: 10px;
                top: 10px;
                height: 20px;
                width: 20px;
                background-color: #fafafd;
                border-radius: 100%;
                border: 1px solid #dce0e7;
                transform: rotate(45deg)
            }

            .file-uploaded {
                background-color: #fff
            }

            .file-uploader-label.transformer-form-input-error::before {
                content: "Доступные форматы: doc, docx, pdf, png, jpg, jpeg, xls, xlsx, zip, rar, 7z, pptx, ppt, pptm. Размер файла: не более 10 МБ.";
                position: absolute;
                top: -43px;
                left: 0;
                max-height: 40px;
                width: calc(100% - 25px);
                background-color: #fe0000;
                font-size: 11px;
                color: #fff;
                border-radius: 5px;
                padding: 12px 10px 13px 15px;
                text-align: center
            }

            .file-uploader-label.transformer-form-input-error::after {
                content: "";
                position: absolute;
                top: -6px;
                left: 50%;
                border: 5px solid transparent;
                border-top: 5px solid #fe0000
            }

            .pp-checkbox-container {
                display: flex;
                font-size: 11px;
                align-items: center
            }

            #Requirements::placeholder {
                line-height: 1.5;
                letter-spacing: -.28px;
                font-size: 14px;
                font-family: Manrope, sans-serif
            }

            #pp-checkbox-6bcfb75 {
                position: absolute;
                z-index: -1;
                opacity: 0
            }

            #pp-checkbox-6bcfb75+label {
                user-select: none;
                position: relative;
                display: flex;
                align-items: center
            }

            #pp-checkbox-6bcfb75+label a {
                margin-left: 3px;
                color: #0f61fe;
                text-decoration: none;
                letter-spacing: -.3px
            }

            #pp-checkbox-6bcfb75+label::before {
                content: "";
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 1px solid #dce0e7;
                border-radius: 5px;
                margin-right: 9px
            }

            #pp-checkbox-6bcfb75.transformer-form-input-error+label::before {
                border-color: #fe0000
            }

            #pp-checkbox-6bcfb75:checked+label::after {
                content: "";
                position: absolute;
                border-left: 1px solid #2c3f57;
                border-bottom: 1px solid #2c3f57;
                left: 6px;
                top: 6px;
                height: 5px;
                width: 11px;
                transform: rotate(-45deg)
            }

            .submit-button {
                color: #fff;
                font-weight: 700;
                background-color: #e60000;
                max-height: unset;
                height: 50px;
                width: 290px;
                margin-top: 30px;
                margin-bottom: 0;
                margin-left: 0;
                margin-right: 0;
                letter-spacing: -.2px
            }

            .submit-button:hover {
                background-color: #fe0000
            }

            .transformer-form.modified-paddings {
                padding: 34px 40px 40px 40px
            }

            .modified-paddings .transformer-form-input:not(.submit-button) {
                margin-bottom: 25px;
                width: 100%
            }
        </style>
        <div class="transformer-form-title">Помощь в написании учебных работ</div>
        <form id="6bcfb75" class="transformer-form-form" method="POST" enctype="multipart/form-data"
            action="https://www.homework.ru/order/form-partner/">
            <input type="hidden" name="PartnerId" value="14708" />
            <div class="someinputs"><input name="MyName" id="MyName" type="text" autocomplete="off" placeholder="Имя"
                    value=""><label for="MyName">Имя</label></div>
            <div class="transformer-form-description">1500+ квалифицированных специалистов готовы вам помочь</div>
            <div class="transformer-form-inputs-container">
                <select class="transformer-form-input" name="WorkType" id="WorkType" required>
                    <option class="work-type-option" disabled selected>Выберите тип работы</option>
                    <option class="work-type-option" value="29">Часть диплома</option>
                    <option class="work-type-option" value="13">Дипломная работа</option>
                    <option class="work-type-option" value="11">Курсовая работа</option>
                    <option class="work-type-option" value="9">Контрольная работа</option>
                    <option class="work-type-option" value="54">Решение задач</option>
                    <option class="work-type-option" value="6">Реферат</option>
                    <option class="work-type-option" value="1">Научно - исследовательская работа</option>
                    <option class="work-type-option" value="12">Отчет по практике</option>
                    <option class="work-type-option" value="10">Ответы на билеты</option>
                    <option class="work-type-option" value="47">Тест/экзамен online</option>
                    <option class="work-type-option" value="3">Монография</option>
                    <option class="work-type-option" value="7">Эссе</option>
                    <option class="work-type-option" value="8">Доклад</option>
                    <option class="work-type-option" value="15">Компьютерный набор текста</option>
                    <option class="work-type-option" value="18">Компьютерный чертеж</option>
                    <option class="work-type-option" value="21">Рецензия</option>
                    <option class="work-type-option" value="22">Перевод</option>
                    <option class="work-type-option" value="23">Репетитор</option>
                    <option class="work-type-option" value="25">Бизнес-план</option>
                    <option class="work-type-option" value="26">Конспекты</option>
                    <option class="work-type-option" value="30">Проверка качества</option>
                    <option class="work-type-option" value="32">Экзамен на сайте</option>
                    <option class="work-type-option" value="34">Аспирантский реферат</option>
                    <option class="work-type-option" value="4">Магистерская работа</option>
                    <option class="work-type-option" value="5">Научная статья</option>
                    <option class="work-type-option" value="14">Научный труд</option>
                    <option class="work-type-option" value="16">Техническая редакция текста</option>
                    <option class="work-type-option" value="17">Чертеж от руки</option>
                    <option class="work-type-option" value="19">Диаграммы, таблицы</option>
                    <option class="work-type-option" value="20">Презентация к защите</option>
                    <option class="work-type-option" value="27">Тезисный план</option>
                    <option class="work-type-option" value="28">Речь к диплому</option>
                    <option class="work-type-option" value="40">Доработка заказа клиента</option>
                    <option class="work-type-option" value="42">Отзыв на диплом</option>
                    <option class="work-type-option" value="45">Публикация статьи в ВАК</option>
                    <option class="work-type-option" value="51">Публикация статьи в Scopus</option>
                    <option class="work-type-option" value="50">Дипломная работа MBA</option>
                    <option class="work-type-option" value="46">Повышение оригинальности</option>
                    <option class="work-type-option" value="53">Копирайтинг</option>
                    <option class="work-type-option" value="55">Другое</option>
                </select>
                <input placeholder="Тема работы" type="text" name="Topic" id="Topic" required
                    class="transformer-form-input">
                <input placeholder="Электронная почта" type="email" name="Email" id="Email"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$" required class="transformer-form-input">
                <input placeholder="+7 (___) ___-__-__" type="tel" name="Phone" id="Phone"
                    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}" required
                    class="transformer-form-input">
                <input placeholder="Предмет" type="text" name="Subject" Id="Subject"
                    class="transformer-form-input"><input placeholder="Количество страниц" type="number"
                    name="PagesCount" Id="PagesCount" class="transformer-form-input"><label for="File-6bcfb75"
                    class="transformer-form-input file-uploader-label"><span class="file-uploader-text">Добавьте
                        файл</span> <span class="file-uploader-decorator"
                        onclick='removeFile6bcfb75(this, event)'>+</span></label><input id="File-6bcfb75"
                    placeholder="Добавьте файл" type="file" name="File" class="file-input"
                    style="width:100%;display:none;" onchange='uploadFile6bcfb75(this)'
                    accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/png,image/jpeg,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,application/x-7z-compressed,application/vnd.rar,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"><textarea
                    id="Requirements"
                    placeholder="Укажите требования к оформлению/оригинальности, и любую другую важную для выполнения информацию"
                    type="text" name="Requirements" class="transformer-form-input"
                    style="width:100%;min-height:100px;resize:none;"></textarea>
            </div>
            <div class="transformer-form-submit-container">
                <div class="pp-checkbox-container">
                    <input checked="checked" type="checkbox" name="pp-checkbox" id="pp-checkbox-6bcfb75" required>
                    <label for="pp-checkbox-6bcfb75">Принимаю<a
                            href="http://www.homeworkpro.ru/about/privacy-policy/?PartnerId=14708"
                            target="_blank">Политику конфиденциальности</a></label>
                </div>
                <input type="button" value="Узнать стоимость" name="SubmitButton"
                    class="transformer-form-input submit-button"
                    onclick="hwValidate6bcfb75(this.closest('form.transformer-form-form'))">
            </div>
        </form>
    </div>
    `;
    useEffect(() => {
        const b = document.getElementById('block-help');
        b.append(block)
    }, []);

    return (
        <div id="block-help" className="help"></div>
    )
};

export default Help;