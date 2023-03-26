import { Document, Footer, AlignmentType, Packer, HeadingLevel, Paragraph, ExternalHyperlink, TextRun } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Хук формирования и загрузки .docx документа с подписью My Bibliography в нижнем колонтитуле.
 */

export const useDownload = () => {
    const footerText = [
    new Paragraph({
        children: [
            new ExternalHyperlink({
                children: [
                    new TextRun({
                        text: "Создано при помощи сервиса ",
                        size: 22,
                        font: "Mulish",
                        color: "000000",
                    }),
                    new TextRun({
                        text: "My Bibliography",
                        size: 22,
                        bold: true,
                        font: "Mulish",
                        color: "FF753E",
                    }),
                ],
                link: "https://mybibliography.ru",
            }),
        ],
    }),
    new Paragraph({
        children: [
            new ExternalHyperlink({
                children: [
                    new TextRun({
                        text: "mybibliography.ru",
                        size: 22,
                        font: "Mulish",
                        color: "000000",
                        underline: {},
                    }),
                    new TextRun({
                        text: " – Быстрый список литературы онлайн",
                        size: 22,
                        font: "Mulish",
                        color: "000000",
                    }),
                ],
                link: "https://mybibliography.ru",
            }),
        ],
    })];

    function download(title, content) {            
        const doc = new Document({
            styles: {
                default: {
                    heading1: {
                        run: {
                            size: 28,
                            bold: true,
                            font: "Times New Roman",
                            color: "000000",
                        },
                        paragraph: {
                            spacing: {
                                after: 120, 
                                line: 359, 
                            },
                        },
                    },
                    listParagraph: {
                        run: {
                            size: 28,
                            font: "Times New Roman",
                            color: "000000",
                        },
                        paragraph: {
                            spacing: {
                                line: 359,
                            },
                        },
                    },
                },
            },
            numbering: {
                config: [
                    {
                        reference: "main-numbering",
                        levels: [
                            {
                                level: 0,
                                format: "upperRoman",
                                text: "%1",
                                size: 28,
                                alignment: AlignmentType.START,
                                style: {
                                    size: 28,
                                    font: "Times New Roman",
                                    color: "000000",
                                    paragraph: {
                                        indent: { left: 720, hanging: 260 },
                                    },
                                },
                            },
                            {
                                level: 1,
                                format: "decimal",
                                text: "%2.",
                                size: 28,
                                alignment: AlignmentType.START,
                                style: {
                                    size: 28,
                                    font: "Times New Roman",
                                    color: "000000",
                                    paragraph: {
                                        indent: { left: 720, hanging: 260 },
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
            sections: [
                {
                    footers: {
                        default: new Footer({
                            children: footerText,
                        }),
                    },
                    children: [
                        new Paragraph({
                            text: title,
                            heading: HeadingLevel.HEADING_1,
                        }),
                        ...content
                    ]
                },
            ],
        });

        Packer.toBlob(doc).then((buffer) => {
            saveAs(buffer, `${title}.docx`);
        });
      }

    return {download}
}