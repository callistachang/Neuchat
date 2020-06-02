FROM python:3.6-slim-buster

ENV PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PYTHONFAULTHANDLER=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.0.5

RUN pip install "poetry==${POETRY_VERSION}"
RUN poetry config virtualenvs.create false

RUN mkdir /code
WORKDIR /code
COPY poetry.lock pyproject.toml /code/

RUN poetry install -n

COPY . /code