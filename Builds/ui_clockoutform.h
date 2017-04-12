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
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ClockoutForm
{
public:
    QGridLayout *gridLayout;
    QWidget *idk;
    QVBoxLayout *verticalLayout_2;
    QHBoxLayout *horizontalLayout;
    QVBoxLayout *verticalLayout;
    QComboBox *Projects;
    QComboBox *Items;
    QComboBox *Times;
    QComboBox *Lunch;
    QPushButton *Add;
    QPushButton *Delete;
    QVBoxLayout *verticalLayout_3;
    QTableWidget *Sections;
    QTextEdit *Description;
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
        ClockoutForm->setFont(font);
        ClockoutForm->setStyleSheet(QLatin1String("QWidget#ClockoutForm{\n"
"\n"
"background-color:#BAC7BE;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 14px;\n"
"\n"
"}\n"
"\n"
"\n"
"QTabWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"border-top: 15px solid #D3D3D3;\n"
"\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"QTabWidget#EmployeeSettings{\n"
"background-color:#F1F4F5;\n"
"}\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#E4E9EB;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#E4E9EB;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0"
                        "px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
""));
        gridLayout = new QGridLayout(ClockoutForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        idk = new QWidget(ClockoutForm);
        idk->setObjectName(QStringLiteral("idk"));
        verticalLayout_2 = new QVBoxLayout(idk);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        verticalLayout = new QVBoxLayout();
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setSizeConstraint(QLayout::SetMinimumSize);
        Projects = new QComboBox(idk);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMaximumSize(QSize(250, 16777215));
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        verticalLayout->addWidget(Projects);

        Items = new QComboBox(idk);
        Items->setObjectName(QStringLiteral("Items"));
        Items->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Items);

        Times = new QComboBox(idk);
        Times->setObjectName(QStringLiteral("Times"));
        Times->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Times);

        Lunch = new QComboBox(idk);
        Lunch->setObjectName(QStringLiteral("Lunch"));

        verticalLayout->addWidget(Lunch);

        Add = new QPushButton(idk);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(250, 0));
        Add->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Add);

        Delete = new QPushButton(idk);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Delete);


        horizontalLayout->addLayout(verticalLayout);

        verticalLayout_3 = new QVBoxLayout();
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        Sections = new QTableWidget(idk);
        Sections->setObjectName(QStringLiteral("Sections"));
        Sections->verticalHeader()->setMinimumSectionSize(30);

        verticalLayout_3->addWidget(Sections);

        Description = new QTextEdit(idk);
        Description->setObjectName(QStringLiteral("Description"));
        Description->setMaximumSize(QSize(16777215, 26));

        verticalLayout_3->addWidget(Description);


        horizontalLayout->addLayout(verticalLayout_3);


        verticalLayout_2->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label = new QLabel(idk);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout_2->addWidget(label);

        timeLeft = new QLabel(idk);
        timeLeft->setObjectName(QStringLiteral("timeLeft"));

        horizontalLayout_2->addWidget(timeLeft);

        FinishedButton = new QPushButton(idk);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(idk);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout_2->addLayout(horizontalLayout_2);


        gridLayout->addWidget(idk, 0, 0, 1, 1);


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
        FinishedButton->setText(QApplication::translate("ClockoutForm", "Finish", 0));
        CancelButton->setText(QApplication::translate("ClockoutForm", "Cancel", 0));
    } // retranslateUi

};

namespace Ui {
    class ClockoutForm: public Ui_ClockoutForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CLOCKOUTFORM_H
