import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../components/AuthContext.jsx';
import {
    Box,
    CircularProgress,
    FormControl, FormControlLabel,
    Grid2,
    IconButton,
    MenuItem, Paper, Radio, RadioGroup,
    Select, Tooltip,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Sort, VerticalAlignBottom, VerticalAlignTop, Window} from "@mui/icons-material";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as BsIcons from "react-icons/bs";
import * as Io5Icons from "react-icons/io5";
import * as PiIcons from "react-icons/pi";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogCard from "../../components/game-details/game-logs/LogCard.jsx";

const MyLogsPage = () => {
    const {isAuthenticated, user} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const styles = getStyles(theme, isMobile)

    const userId = user?.id
    const [logs, setLogs] = useState([])

    const sortingOptions = [
        // "Sessions",
        "Jeux",
        "Temps de jeu",
        "Plateformes",
        "Statut"
    ]
    const [sortingOption, setSortingOption] = useState(0)
    // true : ascendant - false : descendant
    const [sortingOrder, setSortingOrder] = useState(true)

    const viewModes = [
        {label: "details", icon: <Window/>},
        {label: "list", icon: <FormatListBulletedIcon/>},
        {label: "grid", icon: <Window/>},
    ]
    const [viewMode, setViewMode] = useState(0)

    const [games, setGames] = useState([])

    async function fetchData() {
        try {
            let response = await fetch(`http://localhost:8080/game-logs/user/${user.id}`)
            if (!response.ok) throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)

            let data = await response.json()
            setLogs(data.data)

            const gameIds = []
            data.data.forEach((log) => {
                gameIds.push(log.igdb_game_id)
            })

            response = await fetch('http://localhost:8080/games/specific', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameIds: gameIds,
                }),
            })

            data = await response.json()
            setGames(data)
        } catch (e) {
            setError(e)
        }
    }

    useEffect(() => {
        try {
            fetchData()
        } catch (e) {
            console.error('Erreur lors de la récupération des journaux :', err)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        /*!isAuthenticated ? (
            <div style={{
                textAlign: 'center'
            }}>
                <h1>Connectez-vous pour accéder à cette section</h1>
            </div>
        ) : loading ? (
            <CircularProgress/>
        ) : error ? (
            <Typography color="error">Erreur</Typography>
        ) : (*/
        <>
            <Typography variant="subtitle2" style={styles.breadcrumb}>
                Profil &gt; Journaux
            </Typography>
            <div style={styles.container}>
                <div style={styles.displayOptions}>
                    <div style={styles.sortingOptions}>
                        <Typography fontSize={"large"}>Trier par</Typography>
                        <FormControl style={styles.sortingOptionForm}>
                            <Select
                                style={styles.sortingOptionSelector}
                                id="sort-selector"
                                value={sortingOption}
                                size={"small"}
                                variant="outlined"
                                onChange={(e) => setSortingOption(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                }}
                            >
                                {
                                    sortingOptions && sortingOptions.map((item, index) => (
                                        <MenuItem key={index} value={index}>
                                            {item}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <IconButton
                            disableTouchRipple
                            onClick={(e) => setSortingOrder(!sortingOrder)}
                            style={styles.sortingButton}
                            sx={{
                                '&:hover': {
                                    background: 'none',
                                    transform: 'scale(1.2)',
                                },
                                '&:active': {
                                    transform: 'scale(1)',
                                },
                            }}
                        >
                            {sortingOrder ? (
                                <VerticalAlignBottom fontSize="large"></VerticalAlignBottom>
                            ) : (
                                <VerticalAlignTop fontSize="large"></VerticalAlignTop>
                            )}
                        </IconButton>
                    </div>

                    <div style={styles.viewModes}>
                        <RadioGroup
                            row
                            value={viewMode}
                            onChange={(event) => setViewMode(Number(event.target.value))}
                        >
                            <FormControl fullWidth>
                                {/*Utiliser le margin des FormControlLabel pour changer l'espacement*/}
                                <Grid2 container spacing={0} justifyContent="center">
                                    {viewModes.map((item, index) => {
                                        return (
                                            <Grid2 key={index}>
                                                <FormControlLabel
                                                    value={viewMode}
                                                    style={styles.viewModeControlLabel}
                                                    control={
                                                        <Radio
                                                            checkedIcon={item.icon}
                                                            icon={item.icon}
                                                            value={index}
                                                            checked={viewMode === index}
                                                            disableTouchRipple
                                                            style={styles.viewModeButton}
                                                            sx={{
                                                                borderRadius: `${index === 0 ? '1rem 0rem 0rem 1rem' : index === viewModes.length - 1 ? '0rem 1rem 1rem 0rem' : '0'}`,
                                                                '&.Mui-checked': {
                                                                    background: theme.palette.background.default,
                                                                }
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Grid2>
                                        )
                                    })}
                                </Grid2>
                            </FormControl>
                        </RadioGroup>
                    </div>
                </div>
                <div style={styles.logsContainer}>
                    <Grid2 container spacing={'2rem'} justifyContent="center">
                        {logs.map((item, index) => {
                                return (
                                    <Box key={index}>
                                        <LogCard
                                            gameData={games.find((game) => game.id === item.igdb_game_id)}
                                            logData={item}
                                        />
                                    </Box>
                                )
                            }
                        )}
                    </Grid2>
                </div>
            </div>
        </>
        // )
    )
}

const getStyles = (theme, isMobile) => ({
    breadcrumb: {
        color: theme.palette.colors.red,
        padding: isMobile ? "0.75em 0 0 0.75em" : "1.5em 0 0 1.5em",
        font: 'Inter',
        fontSize: isMobile ? "0.9em" : "1em",
    },
    container: {
        paddingBlock: '2.5rem',
        paddingInline: '5rem',
    },
    displayOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sortingOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
    },
    sortingOptionForm: {
        display: 'flex',
        alignItems: 'center',
    },
    sortingOptionSelector: {
        boxShadow: `0 0 0.25em${theme.palette.colors.black}`,
        borderRadius: '1rem',
        background: theme.palette.background.default,
        fontSize: "large"
    },
    sortingButton: {
        height: '100%',
        padding: '0',
        fontSize: "large",
        transition: 'transform 0.1s',
    },
    viewModes: {
        borderRadius: '1rem',
        background: theme.palette.background.paper,
        boxShadow: `0 0 0.25rem ${theme.palette.colors.black}`,
    },
    viewModeControlLabel: {
        margin: '0',
    },
    viewModeButton: {
        color: theme.palette.text.primary
    },
    logsContainer: {
        paddingBlock: '2.5rem',
        paddingInline: '0rem',
    },
})

export default MyLogsPage
