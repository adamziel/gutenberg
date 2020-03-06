/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
/**
 * WordPress dependencies
 */
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const { name } = metadata;
export { metadata, name };
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
export const settings = {
	title: __( 'Alert' ),
	supports: {
		html: false,
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
	 *
	 * @param {Object} [props] Properties passed from the editor.
	 *
	 * @return {WPElement} Element to render.
	 */
	edit( {
		className,
		setAttributes,
		attributes: { title, text, textAlign },
	} ) {
		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) =>
							setAttributes( { textAlign: nextTextAlign } )
						}
					/>
				</BlockControls>
				<div
					className={ classnames( className, {
						[ `has-text-align-${ textAlign }` ]: textAlign,
					} ) }
				>
					<RichText
						tagName="h3"
						value={ title }
						placeholder={ __( 'Title', 'create-block' ) }
						keepPlaceholderOnFocus={ true }
						onChange={ ( content ) => {
							setAttributes( { title: content } );
						} }
					/>
					<RichText
						tagName="p"
						value={ text }
						placeholder={ __( 'Text', 'create-block' ) }
						keepPlaceholderOnFocus={ true }
						onChange={ ( content ) => {
							setAttributes( { text: content } );
						} }
					/>
				</div>
			</Fragment>
		);
	},
};
