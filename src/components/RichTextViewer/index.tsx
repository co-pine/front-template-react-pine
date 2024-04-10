import React from 'react';
import './index.less';

interface Props {
  htmlContent?: string;
}

/**
 * 富文本查看器
 * @param props
 * @constructor
 */
const RichTextViewer: React.FC<Props> = (props) => {
  const { htmlContent = '' } = props;

  return (
    <div className="rich-text-viewer">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default React.memo(RichTextViewer);
