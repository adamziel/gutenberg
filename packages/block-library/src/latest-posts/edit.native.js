/**
 * External dependencies
 */
import { TouchableWithoutFeedback, View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { coreBlocks } from '@wordpress/block-library';
import { __ } from '@wordpress/i18n';
import { postList as icon } from '@wordpress/icons';
import { InspectorControls } from '@wordpress/block-editor';
import { fetchRequest } from 'react-native-gutenberg-bridge';
import {
	Icon,
	PanelBody,
	ToggleControl,
	RangeControl,
	QueryControls,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { MIN_EXCERPT_LENGTH, MAX_EXCERPT_LENGTH } from './constants';

class LatestPostsEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
		};
	}

	componentDidMount() {
		this.isStillMounted = true;
		this.fetchRequest = fetchRequest( '/wp/v2/categories' )
			.then( ( categoriesList ) => {
				if ( this.isStillMounted ) {
					// TODO: remove this check after `fetchRequest` types are made consist across platforms
					// (see: https://github.com/wordpress-mobile/gutenberg-mobile/issues/1961)
					if ( typeof categoriesList === 'string' ) {
						this.setState( {
							categoriesList: JSON.parse( categoriesList ),
						} );
					} else {
						this.setState( { categoriesList } );
					}
				}
			} )
			.catch( () => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			} );
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	onSetDisplayPostContent = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( { displayPostContent: value } );
	};

	onSetDisplayPostContentRadio = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( {
			displayPostContentRadio: value ? 'excerpt' : 'full_post',
		} );
	};

	onSetExcerptLength = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( { excerptLength: value } );
	};

	onSetDisplayPostDate = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( { displayPostDate: value } );
	};

	onSetOrder = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( { order: value } );
	};

	onSetOrderBy = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( { orderBy: value } );
	};

	onSetPostsToShow = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( { postsToShow: value } );
	};

	onSetCategories = ( value ) => {
		const { setAttributes } = this.props;
		setAttributes( {
			categories: '' !== value ? value.toString() : undefined,
		} );
	};

	render() {
		const {
			attributes,
			getStylesFromColorScheme,
			name,
			openGeneralSidebar,
			isSelected,
		} = this.props;

		const {
			displayPostContent,
			displayPostContentRadio,
			excerptLength,
			displayPostDate,
			order,
			orderBy,
			postsToShow,
			categories,
		} = attributes;

		const { categoriesList } = this.state;
		const blockType = coreBlocks[ name ];
		const displayExcerptPostContent = displayPostContentRadio === 'excerpt';

		const blockStyle = getStylesFromColorScheme(
			styles.latestPostBlock,
			styles.latestPostBlockDark
		);

		const iconStyle = getStylesFromColorScheme(
			styles.latestPostBlockIcon,
			styles.latestPostBlockIconDark
		);

		const titleStyle = getStylesFromColorScheme(
			styles.latestPostBlockMessage,
			styles.latestPostBlockMessageDark
		);

		const getInspectorControls = () => (
			<InspectorControls>
				<PanelBody title={ __( 'Post content settings' ) }>
					<ToggleControl
						label={ __( 'Show post content' ) }
						checked={ displayPostContent }
						onChange={ this.onSetDisplayPostContent }
						separatorType={
							displayPostContent ? 'fullWidth' : 'none'
						}
					/>
					{ displayPostContent && (
						<ToggleControl
							label={ __( 'Only show excerpt' ) }
							checked={ displayExcerptPostContent }
							onChange={ this.onSetDisplayPostContentRadio }
							separatorType={
								displayExcerptPostContent ? 'fullWidth' : 'none'
							}
						/>
					) }
					{ displayPostContent && displayExcerptPostContent && (
						<RangeControl
							label={ __( 'Excerpt length (words)' ) }
							value={ excerptLength }
							onChange={ this.onSetExcerptLength }
							min={ MIN_EXCERPT_LENGTH }
							max={ MAX_EXCERPT_LENGTH }
							separatorType="none"
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Post meta settings' ) }>
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ displayPostDate }
						onChange={ this.onSetDisplayPostDate }
						separatorType="none"
					/>
				</PanelBody>

				<PanelBody title={ __( 'Sorting and filtering' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={
							undefined !== categories ? Number( categories ) : ''
						}
						onOrderChange={ this.onSetOrder }
						onOrderByChange={ this.onSetOrderBy }
						onCategoryChange={ this.onSetCategories }
						onNumberOfItemsChange={ this.onSetPostsToShow }
					/>
				</PanelBody>
			</InspectorControls>
		);

		return (
			<TouchableWithoutFeedback
				accessible={ ! isSelected }
				disabled={ ! isSelected }
				onPress={ openGeneralSidebar }
			>
				<View style={ blockStyle }>
					{ getInspectorControls() }
					<Icon icon={ icon } { ...iconStyle } />
					<Text style={ titleStyle }>
						{ blockType.settings.title }
					</Text>
					<Text style={ styles.latestPostBlockSubtitle }>
						{ __( 'CUSTOMIZE' ) }
					</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default compose( [
	withDispatch( ( dispatch ) => {
		const { openGeneralSidebar } = dispatch( 'core/edit-post' );

		return {
			openGeneralSidebar: () => openGeneralSidebar( 'edit-post/block' ),
		};
	} ),
	withPreferredColorScheme,
] )( LatestPostsEdit );
