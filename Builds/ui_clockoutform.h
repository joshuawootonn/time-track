/********************************************************************************
** Form generated from reading UI file 'clockoutform.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CLOCKOUTFORM_H
#define UI_CLOCKOUTFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ClockoutForm
{
public:
    QGridLayout *gridLayout;
    QVBoxLayout *verticalLayout_2;
    QHBoxLayout *horizontalLayout;
    QVBoxLayout *verticalLayout;
    QComboBox *Projects;
    QComboBox *Items;
    QComboBox *Times;
    QComboBox *Lunch;
    QPushButton *Add;
    QPushButton *Delete;
    QTableWidget *Sections;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;
    QLabel *timeLeft;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;

    void setupUi(QWidget *ClockoutForm)
    {
        if (ClockoutForm->objectName().isEmpty())
            ClockoutForm->setObjectName(QStringLiteral("ClockoutForm"));
        ClockoutForm->resize(611, 341);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        font.setPointSize(12);
        ClockoutForm->setFont(font);
        gridLayout = new QGridLayout(ClockoutForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        verticalLayout_2 = new QVBoxLayout();
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        verticalLayout = new QVBoxLayout();
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setSizeConstraint(QLayout::SetMinimumSize);
        Projects = new QComboBox(ClockoutForm);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMaximumSize(QSize(250, 16777215));
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        verticalLayout->addWidget(Projects);

        Items = new QComboBox(ClockoutForm);
        Items->setObjectName(QStringLiteral("Items"));
        Items->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Items);

        Times = new QComboBox(ClockoutForm);
        Times->setObjectName(QStringLiteral("Times"));
        Times->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Times);

        Lunch = new QComboBox(ClockoutForm);
        Lunch->setObjectName(QStringLiteral("Lunch"));

        verticalLayout->addWidget(Lunch);

        Add = new QPushButton(ClockoutForm);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(250, 0));
        Add->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Add);

        Delete = new QPushButton(ClockoutForm);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Delete);


        horizontalLayout->addLayout(verticalLayout);

        Sections = new QTableWidget(ClockoutForm);
        Sections->setObjectName(QStringLiteral("Sections"));
        Sections->verticalHeader()->setMinimumSectionSize(30);

        horizontalLayout->addWidget(Sections);


        verticalLayout_2->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label = new QLabel(ClockoutForm);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout_2->addWidget(label);

        timeLeft = new QLabel(ClockoutForm);
        timeLeft->setObjectName(QStringLiteral("timeLeft"));

        horizontalLayout_2->addWidget(timeLeft);

        FinishedButton = new QPushButton(ClockoutForm);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(ClockoutForm);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout_2->addLayout(horizontalLayout_2);


        gridLayout->addLayout(verticalLayout_2, 0, 0, 1, 1);


        retranslateUi(ClockoutForm);

        QMetaObject::connectSlotsByName(ClockoutForm);
    } // setupUi

    void retranslateUi(QWidget *ClockoutForm)
    {
        ClockoutForm->setWindowTitle(QApplication::translate("ClockoutForm", "Time-Track", 0));
        Add->setText(QApplication::translate("ClockoutForm", "Add", 0));
        Delete->setText(QApplication::translate("ClockoutForm", "Delete", 0));
        label->setText(QApplication::translate("ClockoutForm", "Time left:", 0));
        timeLeft->setText(QString());
        FinishedButton->setText(QApplication::translate("ClockoutForm", "Finished", 0));
        CancelButton->setText(QApplication::translate("ClockoutForm", "Cancel", 0));
    } // retranslateUi

};

namespace Ui {
    class ClockoutForm: public Ui_ClockoutForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CLOCKOUTFORM_H
