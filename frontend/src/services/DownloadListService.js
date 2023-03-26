import { Paragraph } from 'docx';
import { useDownload } from "../hooks/useDownload";

/**
 * Сервис загрузки списка литературы, который использует хук загрузки документа useDownload.
 */

const DownloadListService = () => {
    const {download} = useDownload();
    function downloadList(list) {
        const referencesList = list.map(item => 
            new Paragraph({
                text: item,
                numbering: {
                    reference: "main-numbering",
                    level: 1,
                },
            })
        );
        download("Список литературы", referencesList);
    }
    return {downloadList}
};
export default DownloadListService;