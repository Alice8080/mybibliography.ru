import { useContent } from "../../hooks/useContent"; 
import { useGetSourceQuery } from '../../api/apiSlice';
import SourceView from '../../components/SourceView';
import SEO from '../../components/SEO';
import './source.scss';

const Source = ({sourceName}) => {
  const response = useGetSourceQuery(sourceName);
  const {renderContent} = useContent();
  const sourceView = renderContent(response, <SourceView sourceInfo={response.data} />);
  return (
    <section className="source">
      <SEO
          title='Оформление ссылки на источник'
          description='Оформите ссылку на свой источник быстро и грамотно.' />
      {sourceView}
    </section>
  );
}

export default Source;