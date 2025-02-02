import Item from './Item';

import formatPrice from '../../modules/format-price';

import './index.css';

const getSubtitle = (text, minPrice, maxPrice) => {
    if(minPrice || maxPrice){
        return <div
            className = "item-group-subtitle-wrapper"
        >
            <div>
                {`${formatPrice(minPrice)} - ${formatPrice(maxPrice)}` }
                <div className="note">
                    per slot
                </div>
            </div>
        </div>;
    }

    return <div
        className = "item-group-subtitle-wrapper"
    >
        <div>
            {text}
        </div>
    </div>;
};

function ItemGrid(props) {
    let minPrice = false;
    let maxPrice = false;

    for(const item of props.items){
        if(!minPrice || item.pricePerSlot < minPrice){
            minPrice = item.pricePerSlot;
        }

        if(!maxPrice || item.pricePerSlot > maxPrice){
            maxPrice = item.pricePerSlot;
        }
    }

    minPrice = Math.floor(minPrice / 1000) * 1000;
    maxPrice = Math.ceil(maxPrice / 1000) * 1000;

    let className = 'item-group-wrapper';

    if(props.name.length <= 2){
        className = `${className} big`;
    }

    return <div
            className = {className}
        >
            <div
                className = "item-group-title"
            >
                <div
                    className = "barter-class-wrapper"
                >
                    {props.name}
                </div>
                { getSubtitle(props.subtitle, minPrice, maxPrice) }
                { props.extraTitleProps }
            </div>
            <div
                className = "item-group-items"
            >
                {props.items.map(item =>
                    <Item
                        key = {`${props.name}-${item.id}`}
                        onClick = {item.onClick}
                        count = {item.count}
                        name = {item.name}
                        pricePerSlot = {item.pricePerSlot}
                        sellTo = {item.sellTo}
                        slots = {item.slots}
                        src = {item.imgLink}
                        // src = {`https://assets.tarkov-tools.com/${item.id}-grid_image.jpg`}
                        itemLink = {`/item/${item.normalizedName}`}
                        height = {item.height}
                        width = {item.width}
                        item = {item}
                    />
                )}
            </div>
        </div>
}

export default ItemGrid;


