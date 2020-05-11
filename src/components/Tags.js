import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FeedContext } from "../context/FeedContext";
import { LightningIcon, ShuffleIcon } from "./Icons";
import { shuffle } from "../utils";

const Wrapper = styled.div`
  margin: 0.6rem 0;

  .shuffle {
    cursor: pointer;

    h3 {
      margin-bottom: 0.3rem;
    }
  }

  .tags {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  h4 {
    margin-bottom: 1rem;
  }

  svg {
    fill: ${(props) => props.theme.accent};
    position: relative;
    top: 5px;
    margin-right: 0.5rem;
  }
`;

const Tags = ({ setNavOpen }) => {
  const { userFeeds } = useContext(FeedContext);

  const tagList = userFeeds.map((userFeed) => userFeed.tags);
  let tags = [].concat.apply([], tagList);
  tags = [...new Set(tags)];

  const [filteredTags, setFilteredTags] = useState(tags);

  const closeNav = () => {
    if (setNavOpen) setNavOpen(false);
  };

  const shuffleTags = () => setFilteredTags([...shuffle(filteredTags)]);

  return (
    <Wrapper>
      {filteredTags.length ? (
        <span
          className="shuffle"
          onClick={shuffleTags}
          style={{ display: "inline-block", marginBottom: "1rem" }}
        >
          <h3>
            <ShuffleIcon />
            Shuffle Tags
          </h3>
        </span>
      ) : null}
      <div className="tags">
        {filteredTags.length
          ? filteredTags.map((tag) => (
              <Link onClick={closeNav} key={tag} to={`/tags/${tag}`}>
                <motion.h4 positionTransition={{ damping: 100, stiffness: 50 }}>
                  <LightningIcon />
                  {tag}
                </motion.h4>
              </Link>
            ))
          : null}
      </div>
    </Wrapper>
  );
};

export default Tags;
