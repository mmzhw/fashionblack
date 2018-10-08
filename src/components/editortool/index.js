import React from 'react';
import styles from './index.less';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import createImagePlugin from 'draft-js-image-plugin';
import { uploadImageReq } from '../../utils/commfun';

const imagePlugin = createImagePlugin();

class EditorTool extends React.Component {
    constructor(props, context) {
        super(props, context);
        const blocksFromHtml = htmlToDraft(this.props.value);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState: editorState,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            const blocksFromHtml = htmlToDraft(nextProps.value);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState,
            });
        }
    }

    onEditorStateChange (editorState) {
        this.setState({
            editorState,
        });
        if (this.props.onEditorChange) {
            this.props.onEditorChange(this.props.id, draftToHtml(convertToRaw(editorState.getCurrentContent())).trim());
        }
        // if (this.props.onChange) {
        //     // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        //     // console.log(this.props.id);
        //     let newValue = {
        //         [this.props.id]: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        //     };
        //     console.log('newValue', newValue);
        //     this.props.onChange(newValue);
        // }
    };

    render() {
        const { editorState } = this.state;
        // console.log(this.props);
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName={styles['editWrapper']}
                    editorClassName={styles['editContent']}
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'image'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough'],
                        },
                        list: {
                            options: ['unordered', 'ordered'],
                        },
                        image: {
                            uploadEnabled: true,
                            previewImage: true,
                            urlEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: uploadImageReq,
                        },
                    }}
                    localization={{
                        locale: 'zh',
                    }}
                    plugins={[imagePlugin]}
                />
            </div>
        );
    }
}

export default EditorTool;

